import React, { useEffect } from 'react'

const ModalBackground = ({
    isOpen,
    onClose,
    children
}: {
    isOpen: boolean,
    onClose: ()=>void
    children: React.ReactNode
}) => {

    useEffect(() => {
        // Save the current scroll position when the modal is opened
        const scrollPosition = document.documentElement.scrollTop;

        // Prevent background scrolling when the modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }

        // Restore the scroll position and allow background scrolling when the modal is closed
        return () => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            window.scrollTo(0, scrollPosition);
        };
    }, [isOpen]);

    if(!isOpen)return;

    return (
        <section className='fixed flex justify-center left-0 items-center text-xl top-0 w-full h-full z-[9999] backdrop-blur-sm ' onClick={onClose}>
            {children}
        </section>
    )
}

export default ModalBackground