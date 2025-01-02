import React, { useEffect, useState } from 'react'
import CustomInput from './CustomInput'
import ModalBackground from './ModalBackground'
import Task from '../../models/task';
import * as Yup from 'yup';
import { task } from '../../src/pages/AllTask/AllTaskPage';
import { useAppContext } from '../../appContext';

interface FormModalProps {
  openModal: boolean;
  closeModal: () => void;
  type?: string;
  data?:task;
  id?:string;
}

///////Validation schema pretty obvious
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  subject: Yup.string().required('Subject is required'),
  submissionDate: Yup.date().required('Submission Date is required'),
  description: Yup.string().required('Description is required'),
  priority: Yup.string().oneOf(['High', 'Medium', 'Low']).required('Priority is required'),
  status: Yup.string().oneOf(['Completed', 'In progress', 'Failed']).required('Status is required'),
  createdOn: Yup.date().required('Created On is required'),
});


const FormModal: React.FC<FormModalProps> = ({ openModal, closeModal, type, data, id }) => {
  const Contenxt = useAppContext()
  const initialData = {
    title: type === 'Edit' ? data?.title : null,
    subject: type === 'Edit' ? data?.subject : null,
    submissionDate: type === 'Edit' ? data?.submissionDate : null,
    description: type === 'Edit' ? data?.description : null,
    priority: type === 'Edit' ? data?.priority : null,
    status: type === 'Edit' ? data?.status : null,
    createdOn: type === 'Edit' ? data?.createdOn : null,
  }
  const [formData, setFormData] = useState<task>({
    title: initialData.title ?? '',
    subject: initialData.subject ?? '',
    submissionDate: initialData.submissionDate ?? new Date(),
    description: initialData.description ?? '',
    priority: initialData.priority ?? 'Low',
    status: initialData.status ?? 'In progress',
    createdOn: initialData.createdOn ?? new Date(),
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const resetForm=()=>{
    setFormData(({
      title: '',
      subject: '',
      submissionDate: new Date(),
      description: '',
      priority: 'Low',
      status: 'In progress',
      createdOn:new Date(),
    }))
    setErrors({})
  }

  useEffect(()=>{
    if( type !== 'Edit'){
      resetForm()
    }
  },[])
  useEffect(()=>{
    
    if( type === 'Edit' && data){
      //@ts-ignore
      setFormData(initialData)
    }
  },[data, type])

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };


  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (!isValid) return;
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newtask = new Task(
      formData.title,
      formData.subject,
      new Date(formData.submissionDate),
      formData.description,
      formData.priority,
      formData.status,
      new Date(formData.createdOn)
    );
    newtask.create();
    setIsLoading(false)
    Contenxt?.handleUpdate()
     resetForm()
     closeModal()
  };


  const handleEdit = async () => {
    const isValid = await validateForm();
    if (!isValid) return;
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newtask = new Task(
      formData.title,
      formData.subject,
      new Date(formData.submissionDate),
      formData.description,
      formData.priority,
      formData.status,
      new Date(data?.createdOn as Date),
      id as string,
    );
   
    Task.editById(id as string, newtask);
    setIsLoading(false)
    Contenxt?.handleUpdate()
     resetForm()
     closeModal()
  };


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });

    try {
        await validationSchema.validateAt(name, { [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    } catch (err) {
        if (err instanceof Yup.ValidationError) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: err.message }));
        }
    }
  }
  const btnTitle= type === 'Edit' ? 'Edit' :'Create'
  const Title= type === 'Edit' ? 'Edit Task' :'Add New Task'

  if (!openModal) return null;

  return (
    <ModalBackground isOpen={openModal} onClose={closeModal}>
      <div className='shadow-xl rounded-lg scale-95 px-10 pb-10 p-5 w-full bg-slate-50 min-h-[350px] max-w-[700px] mx-5 sm:mx-10 md:mx-auto' onClick={(e) => e.stopPropagation()} >
        <h2 className='pb-5 sm:text-2xl'>{Title}
          <p className=' h-[3px] mt-1  rounded-l-xl w-[20%] bg-primary'></p>
        </h2>
        <form action="" className="w-full">
          <CustomInput
            label='Title'
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            error={errors['title']}
          />
          <CustomInput
            label='Task Subject'
            type='text'
            name='subject'
            value={formData.subject}
            onChange={handleChange}
            error={errors['subject'] }
          />
          <CustomInput
            label='Submission Date'
            type='date'
            name='submissionDate'
            value={new Date(formData.submissionDate).toISOString().split('T')[0]}
            onChange={handleChange}
            error={errors['submissionDate']}
          />

          <div className=" md:flex justify-between">

          <div className="mt-4 mb-4">
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <div className="mt-2 gap-x-5 flex">
              {['High', 'Medium', 'Low'].map((priority) => (
                <div key={priority} className="flex items-center">
                  <input
                    id={priority}
                    name="priority"
                    type="radio"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <label htmlFor={priority} className="ml-3 block text-sm font-medium text-gray-700">
                    {priority}
                  </label>
                </div>
              ))}
            {errors['priority'] && <p className="mt-2 text-sm text-red-600">{errors['priority']}</p>}

            </div>
          </div>
         
          <div className="mt-4 mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <div className="mt-2 gap-x-5 flex">
              {['Completed', 'In progress', 'Failed'].map((status) => (
                <div key={status} className="flex items-center">
                  <input
                    id={status}
                    name="status"
                    type="radio"
                    value={status}
                    checked={formData.status === status}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <label htmlFor={status} className="ml-3 block text-sm font-medium text-gray-700">
                    {status}
                  </label>
                </div>
              ))}
            {errors['status'] && <p className="mt-2 text-sm text-red-600">{errors['status']}</p>}

            </div>
          </div>

          </div>
          <CustomInput
            label='Description'
            type='textarea'
            name='description'
            value={formData.description}
            onChange={handleChange}
            error={errors['textarea']}
          />



          <button
            className='bg-primary  min-w-48 hover:opacity-95 hover:scale-95 focus:scale-95 transition-all ease-in-out font-semibold h-10 rounded-md px-7 float-end text-sm md:text-base text-white'
            type='button'
            onClick={type === 'Edit'?handleEdit: handleSubmit}
          >
            {isLoading?'Fake Delay...': btnTitle}
          </button>
        </form>
      </div>
    </ModalBackground>
  )
}

export default FormModal