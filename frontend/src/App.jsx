import { useEffect, useState } from 'react';
import {
    getPlans,
    createPlan,
    deletePlan,
    updatePlan,
    getNotes,
    createNote
} from './services/api';

import PlanCard from './components/PlanCard';
import CreatePlanForm from './components/CreatePlanForm';
import Modal from './components/Modal';
import { motion } from 'framer-motion';
import { fireConfetti } from './utils/confetti';

function App() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingPlan, setEditingPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 🗑 Plan pendiente de eliminar
    const [planToDelete, setPlanToDelete] = useState(null);
    const [isNotesOpen, setIsNotesOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [currentUser, setCurrentUser] = useState(
        localStorage.getItem('lovePlannerUser') || ''
    );

    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        getPlans()
            .then(data => {
                setPlans(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading plans:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (isNotesOpen) {
            getNotes()
                .then(data => {
                    setNotes(data);
                })
                .catch(error => {
                    console.error('Error loading notes:', error);
                });
        }
    }, [isNotesOpen]);

    // ➕ Crear / ✏️ Editar
    async function handleCreatePlan(planData) {
        try {
            if (editingPlan) {
                await updatePlan(editingPlan.id, planData);

                setPlans(prev =>
                    prev.map(plan =>
                        plan.id === editingPlan.id ?
                        {...plan, ...planData } :
                        plan
                    )
                );

                setEditingPlan(null);
            } else {
                const newPlan = await createPlan(planData);
                setPlans(prev => [...prev, newPlan]);

                // 🎉 Confeti suave
                fireConfetti();
                setTimeout(() => fireConfetti(), 300);
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving plan:', error);
        }
    }

    // 🗑 Solicitar eliminar
    function handleDeletePlan(id) {
        const plan = plans.find(p => p.id === id);
        setPlanToDelete(plan);
    }

    // 🗑 Confirmar eliminar
    async function confirmDeletePlan() {
        if (!planToDelete) return;

        try {
            await deletePlan(planToDelete.id);
            setPlans(prev =>
                prev.filter(p => p.id !== planToDelete.id)
            );
        } catch (error) {
            console.error('Error deleting plan:', error);
        } finally {
            setPlanToDelete(null);
        }
    }

    // ✏️ Editar
    function handleEditPlan(plan) {
        setEditingPlan(plan);
        setIsModalOpen(true);
    }

    function sortPlansByDate(plans) {
        return [...plans].sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time || '00:00'}`);
            const dateB = new Date(`${b.date}T${b.time || '00:00'}`);
            return dateA - dateB;
        });
    }

    function groupPlansByTime(plans) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const groups = {
            past: [],
            today: [],
            upcoming: []
        };

        plans.forEach(plan => {
            const planDate = new Date(`${plan.date}T${plan.time || '00:00'}`);
            const planDay = new Date(planDate);
            planDay.setHours(0, 0, 0, 0);

            if (planDay < today) {
                groups.past.push(plan);
            } else if (planDay.getTime() === today.getTime()) {
                groups.today.push(plan);
            } else {
                groups.upcoming.push(plan);
            }
        });

        return groups;
    }

    const groupedPlans = groupPlansByTime(sortPlansByDate(plans));

    return ( <
        div style = { styles.container } >
        <
        h1 style = { styles.title } > Planes de Joel y Kenyi🥰 < /h1> <
        p style = { styles.subtitle } >
        Planes especiales para compartir juntos <
        /p>

        { /* Botón Desktop */ } <
        div style = { styles.actions } >
        <
        button className = "new-plan-desktop"
        style = { styles.newButton }
        onClick = {
            () => {
                setEditingPlan(null);
                setIsModalOpen(true);
            }
        } >
        ❤️Nuevo plan <
        /button>

        <
        button style = {
            {...styles.newButton, marginLeft: '10px', background: '#ff5c8a' } }
        onClick = {
            () => setIsNotesOpen(true) } >
        💌Notas <
        /button> <
        /div>

        {
            loading && < p > Cargando planes... < /p>}

            {
                !loading && plans.length === 0 && ( <
                    p > No hay planes aún💔 < /p>
                )
            }

            <
            div style = { styles.list } > {
                groupedPlans.today.length > 0 && ( <
                    >
                    <
                    h3 style = { styles.sectionTitle } > 🌸Hoy < /h3> <
                    div style = { styles.timeline } >
                    <
                    div style = { styles.timelineLine }
                    /> {
                        groupedPlans.today.map(plan => ( <
                            div key = { plan.id }
                            style = { styles.timelineItem } >
                            <
                            span style = { styles.timelineDot }
                            /> <
                            PlanCard plan = { plan }
                            onDelete = { handleDeletePlan }
                            onEdit = { handleEditPlan }
                            /> <
                            /div>
                        ))
                    } <
                    /div> <
                    />
                )
            }

            {
                groupedPlans.upcoming.length > 0 && ( <
                    >
                    <
                    h3 style = { styles.sectionTitle } > 💖Próximos < /h3> <
                    div style = { styles.timeline } >
                    <
                    div style = { styles.timelineLine }
                    /> {
                        groupedPlans.upcoming.map(plan => ( <
                            div key = { plan.id }
                            style = { styles.timelineItem } >
                            <
                            span style = { styles.timelineDot }
                            /> <
                            PlanCard plan = { plan }
                            onDelete = { handleDeletePlan }
                            onEdit = { handleEditPlan }
                            /> <
                            /div>
                        ))
                    } <
                    /div> <
                    />
                )
            }

            {
                groupedPlans.past.length > 0 && ( <
                    >
                    <
                    h3 style = { styles.sectionTitle } > 🌙Pasados < /h3> <
                    div style = { styles.timeline } >
                    <
                    div style = { styles.timelineLine }
                    /> {
                        groupedPlans.past.map(plan => ( <
                            div key = { plan.id }
                            style = { styles.timelineItem } >
                            <
                            span style = { styles.timelineDot }
                            /> <
                            PlanCard plan = { plan }
                            onDelete = { handleDeletePlan }
                            onEdit = { handleEditPlan }
                            /> <
                            /div>
                        ))
                    } <
                    /div> <
                    />
                )
            } <
            /div>

            { /* FAB Mobile */ } <
            motion.button
            className = "fab"
            style = { styles.fab }
            whileHover = {
                { scale: 1.08 } }
            whileTap = {
                { scale: 0.95 } }
            animate = {
                { y: [0, -6, 0] } }
            transition = {
                {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }
            }
            onClick = {
                    () => {
                        setEditingPlan(null);
                        setIsModalOpen(true);
                    }
                } >
                ➕
                <
                /motion.button>

            { /* MODAL CREAR / EDITAR */ } <
            Modal
            isOpen = { isModalOpen }
            onClose = {
                    () => {
                        setIsModalOpen(false);
                        setEditingPlan(null);
                    }
                } >
                <
                CreatePlanForm
            onSubmit = { handleCreatePlan }
            initialData = { editingPlan }
            />

            {
                editingPlan && ( <
                    button style = { styles.cancelButton }
                    onClick = {
                        () => {
                            setEditingPlan(null);
                            setIsModalOpen(false);
                        }
                    } >
                    Cancelar edición <
                    /button>
                )
            } <
            /Modal>

            { /* MODAL CONFIRMAR ELIMINAR */ } <
            Modal
            isOpen = {!!planToDelete }
            onClose = {
                    () => setPlanToDelete(null) } >
                <
                h2 style = {
                    { marginBottom: '10px' } } > ¿Eliminar este plan ? 💔
                <
                /h2>

            <
            div style = { styles.deleteActions } >
                <
                button
            style = { styles.cancelButton }
            onClick = {
                    () => setPlanToDelete(null) } >
                Cancelar <
                /button>

            <
            button
            style = { styles.deleteConfirmButton }
            onClick = { confirmDeletePlan } >
                Sí, eliminar <
                /button> <
                /div> <
                /Modal>

            { /* MODAL NOTAS */ } <
            Modal
            isOpen = { isNotesOpen }
            onClose = {
                    () => setIsNotesOpen(false) } >
                <
                h2 style = {
                    { marginBottom: '20px' } } > 💌Notas Secretas <
                /h2>

            { /* Selector de identidad */ } {
                !currentUser && ( <
                    div style = {
                        { marginBottom: '20px' } } >
                    <
                    p > ¿Quién está escribiendo hoy ? 💕 < /p>

                    <
                    button style = {
                        {...styles.newButton, marginRight: '10px' } }
                    onClick = {
                        () => {
                            localStorage.setItem('lovePlannerUser', 'Joel');
                            setCurrentUser('Joel');
                        }
                    } >
                    Joel <
                    /button>

                    <
                    button style = { styles.newButton }
                    onClick = {
                        () => {
                            localStorage.setItem('lovePlannerUser', 'Kenyi');
                            setCurrentUser('Kenyi');
                        }
                    } >
                    Kenyi <
                    /button> <
                    /div>
                )
            }

            { /* Formulario de nueva nota */ } {
                currentUser && ( <
                    div style = {
                        { marginBottom: '20px' } } >
                    <
                    p >
                    Escribiendo como < strong > { currentUser } < /strong> 💖 <
                    /p>

                    <
                    textarea value = { newNote }
                    onChange = {
                        (e) => setNewNote(e.target.value) }
                    placeholder = "Escribe algo bonito..."
                    style = {
                        {
                            width: '100%',
                            padding: '10px',
                            borderRadius: '10px',
                            border: 'none',
                            marginBottom: '10px'
                        }
                    }
                    />

                    <
                    button style = { styles.newButton }
                    onClick = {
                        async() => {
                            if (!newNote.trim()) return;

                            try {
                                const created = await createNote({
                                    author: currentUser,
                                    content: newNote
                                });

                                setNotes(prev => [created, ...prev]);
                                setNewNote('');
                            } catch (err) {
                                console.error('Error creating note:', err);
                            }
                        }
                    } >
                    Guardar nota💌 <
                    /button> <
                    /div>
                )
            }

            { /* Lista de notas */ } {
                notes.length === 0 && ( <
                    p > No hay notas aún💔 < /p>
                )
            }

            {
                notes.map(note => ( <
                    div key = { note.id }
                    style = {
                        {
                            background: 'rgba(255,255,255,0.25)',
                            padding: '12px',
                            borderRadius: '12px',
                            marginBottom: '10px'
                        }
                    } >
                    <
                    strong > { note.author } < /strong> <
                    p style = {
                        { margin: '5px 0 0' } } > { note.content } < /p> <
                    /div>
                ))
            } <
            /Modal> <
            /div>
        );
    }

    const styles = {
        container: {
            minHeight: '100vh',
            width: '100vw',
            padding: '40px 20px',
            background: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center'
        },
        title: {
            fontSize: '3rem',
            marginBottom: '0.5rem'
        },
        subtitle: {
            marginBottom: '2rem',
            opacity: 0.9
        },
        actions: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px'
        },
        newButton: {
            padding: '12px 18px',
            borderRadius: '16px',
            border: 'none',
            background: '#ff7eb3',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer'
        },
        list: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '500px',
            margin: '0 auto'
        },
        cancelButton: {
            padding: '10px 16px',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.6)',
            background: 'rgba(255,255,255,0.15)',
            color: '#fff',
            fontSize: '0.95rem',
            cursor: 'pointer'
        },
        deleteConfirmButton: {
            padding: '10px 16px',
            borderRadius: '14px',
            border: 'none',
            background: '#ff5c8a',
            color: '#fff',
            fontSize: '0.95rem',
            cursor: 'pointer'
        },
        deleteActions: {
            display: 'flex',
            justifyContent: 'center',
            gap: '12px'
        },
        fab: {
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#ff7eb3',
            color: '#fff',
            fontSize: '1.5rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            display: 'none'
        },
        sectionTitle: {
            margin: '30px 0 10px',
            fontSize: '1.2rem',
            opacity: 0.9
        },
        timeline: {
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            position: 'relative',
            paddingLeft: '26px',
            marginBottom: '30px'
        },
        timelineItem: {
            position: 'relative'
        },
        timelineDot: {
            position: 'absolute',
            left: '-26px',
            top: '26px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 0 0 4px rgba(255,255,255,0.2)'
        },
        timelineLine: {
            position: 'absolute',
            left: '5px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'rgba(255,255,255,0.3)'
        }
    };

    export default App;