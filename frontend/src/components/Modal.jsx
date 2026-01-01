import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

function Modal({ isOpen, onClose, children }) {
    // Cerrar con ESC
    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        if (isOpen) {
            window.addEventListener('keydown', handleKey);
        }

        return () => {
            window.removeEventListener('keydown', handleKey);
        };
    }, [isOpen, onClose]);

    return ( <
        AnimatePresence > {
            isOpen && ( <
                motion.div style = { styles.overlay }
                initial = {
                    { opacity: 0 } }
                animate = {
                    { opacity: 1 } }
                exit = {
                    { opacity: 0 } }
                transition = {
                    { duration: 0.25, ease: 'easeOut' } }
                onClick = { onClose } >
                <
                motion.div style = { styles.modal }
                initial = {
                    { opacity: 0, scale: 0.92, y: 30 } }
                animate = {
                    { opacity: 1, scale: 1, y: 0 } }
                exit = {
                    { opacity: 0, scale: 0.92, y: 30 } }
                transition = {
                    {
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1] // easing tipo app nativa
                    }
                }
                onClick = {
                    (e) => e.stopPropagation() } >
                <
                button style = { styles.closeBtn }
                onClick = { onClose } > ❌
                <
                /button>

                { children } <
                /motion.div> <
                /motion.div>
            )
        } <
        /AnimatePresence>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px'
    },
    modal: {
        background: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
        borderRadius: '22px',
        width: '100%',
        maxWidth: '520px',
        padding: '30px',
        position: 'relative',
        color: '#fff'
    },
    closeBtn: {
        position: 'absolute',
        top: '14px',
        right: '14px',
        background: 'transparent',
        border: 'none',
        fontSize: '1.2rem',
        cursor: 'pointer',
        color: '#fff'
    }
};

export default Modal;