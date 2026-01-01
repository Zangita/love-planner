import { motion } from 'framer-motion';

const typeIcons = {
    dinner: '🍽️',
    movie: '🎬',
    travel: '✈️',
    home: '🏠',
    surprise: '🎁'
};

function PlanCard({ plan, onDelete, onEdit }) {
    return ( <
            motion.div style = { styles.card }
            initial = {
                { opacity: 0, scale: 0.96, y: 20 } }
            whileInView = {
                { opacity: 1, scale: 1, y: 0 } }
            viewport = {
                { once: true, margin: '-60px' } }
            transition = {
                {
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1] // easing tipo app nativa
                }
            }
            whileHover = {
                { scale: 1.03 } } >
            <
            div style = { styles.header } >
            <
            h3 style = { styles.title } > { typeIcons[plan.type] || '💖' } { plan.title } <
            /h3>

            <
            div >
            <
            button style = { styles.editBtn }
            onClick = {
                (e) => {
                    e.stopPropagation();
                    onEdit(plan);
                }
            } >
            ✏️
            <
            /button>

            <
            button style = { styles.deleteBtn }
            onClick = {
                (e) => {
                    e.stopPropagation();
                    onDelete(plan.id);
                }
            } >
            🗑
            <
            /button> <
            /div> <
            /div>

            <
            p > 📅{ plan.date }⏰ { plan.time } < /p> {
                plan.location && < p > 📍{ plan.location } < /p>} {
                    plan.notes && < p > { plan.notes } < /p>} <
                        /motion.div>
                );
            }

            const styles = {
                card: {
                    background: 'rgba(255,255,255,0.28)',
                    borderRadius: '18px',
                    padding: '22px',
                    color: '#fff',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    cursor: 'pointer'
                },
                header: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                },
                title: {
                    margin: 0
                },
                deleteBtn: {
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '1.1rem',
                    cursor: 'pointer'
                },
                editBtn: {
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    marginRight: '8px'
                }
            };

            export default PlanCard;