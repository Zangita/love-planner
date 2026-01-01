import { useEffect, useState } from 'react';

function CreatePlanForm({ onSubmit, initialData }) {
    const [form, setForm] = useState({
        title: '',
        type: 'dinner',
        date: '',
        time: '',
        location: '',
        notes: ''
    });

    // 🔁 Cuando se selecciona un plan para editar, prellenar
    useEffect(() => {
        if (initialData) {
            // Modo edición → prellenar
            setForm({
                title: initialData.title || '',
                type: initialData.type || 'dinner',
                date: initialData.date || '',
                time: initialData.time || '',
                location: initialData.location || '',
                notes: initialData.notes || ''
            });
        } else {
            // Modo crear → limpiar formulario
            setForm({
                title: '',
                type: 'dinner',
                date: '',
                time: '',
                location: '',
                notes: ''
            });
        }
    }, [initialData]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(form);

        // 🔄 Limpia solo si NO estamos editando
        if (!initialData) {
            setForm({
                title: '',
                type: 'dinner',
                date: '',
                time: '',
                location: '',
                notes: ''
            });
        }
    }

    return ( <
        form onSubmit = { handleSubmit }
        style = { styles.form } >
        <
        h2 style = { styles.title } > { initialData ? '✏️ Editar plan' : '➕ Crear nuevo plan' } <
        /h2>

        <
        input style = { styles.input }
        name = "title"
        placeholder = "Título del plan"
        value = { form.title }
        onChange = { handleChange }
        required /
        >

        <
        select style = { styles.input }
        name = "type"
        value = { form.type }
        onChange = { handleChange } >
        <
        option value = "dinner" > 🍽️Cena < /option> <
        option value = "movie" > 🎬Cine < /option> <
        option value = "travel" > ✈️Viaje < /option> <
        option value = "home" > 🏠En casa < /option> <
        option value = "surprise" > 🎁Sorpresa < /option> <
        /select>

        <
        input style = { styles.input }
        type = "date"
        name = "date"
        value = { form.date }
        onChange = { handleChange }
        required /
        >

        <
        input style = { styles.input }
        type = "time"
        name = "time"
        value = { form.time }
        onChange = { handleChange }
        required /
        >

        <
        input style = { styles.input }
        name = "location"
        placeholder = "Lugar"
        value = { form.location }
        onChange = { handleChange }
        />

        <
        textarea style = { styles.textarea }
        name = "notes"
        placeholder = "Notas románticas 💕"
        value = { form.notes }
        onChange = { handleChange }
        />

        <
        button style = { styles.button }
        type = "submit" > { initialData ? 'Guardar cambios 💖' : 'Guardar plan 💖' } <
        /button> <
        /form>
    );
}

const styles = {
    form: {
        background: 'rgba(255,255,255,0.25)',
        padding: '25px',
        borderRadius: '20px',
        maxWidth: '500px',
        margin: '0 auto 40px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
    },
    title: {
        marginBottom: '15px'
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '10px',
        border: 'none'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        minHeight: '70px',
        borderRadius: '10px',
        border: 'none',
        marginBottom: '15px'
    },
    button: {
        width: '100%',
        padding: '12px',
        borderRadius: '14px',
        border: 'none',
        background: '#ff7eb3',
        color: '#fff',
        fontSize: '1rem',
        cursor: 'pointer'
    }
};

export default CreatePlanForm;