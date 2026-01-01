const API_URL =
    import.meta.env.VITE_API_URL;

if (!API_URL) {
    console.error('❌ VITE_API_URL is not defined');
}

export async function getPlans() {
    const response = await fetch(`${API_URL}/plans`);
    if (!response.ok) {
        throw new Error('Error fetching plans');
    }
    return response.json();
}

export async function createPlan(plan) {
    const response = await fetch(`${API_URL}/plans`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plan)
    });

    if (!response.ok) {
        throw new Error('Error creating plan');
    }

    return response.json();
}

export async function deletePlan(id) {
    const response = await fetch(`${API_URL}/plans/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Error deleting plan');
    }

    return response.json();
}

export async function updatePlan(id, plan) {
    const response = await fetch(`${API_URL}/plans/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plan)
    });

    if (!response.ok) {
        throw new Error('Error updating plan');
    }

    return response.json();
}