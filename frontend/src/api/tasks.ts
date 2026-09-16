import type {Task} from '../types/Task';

const API_URL = 'http://localhost:3000';

function getHeaders() {
    const token =
        sessionStorage.getItem('accessToken');

    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
}

export async function getTasks(): Promise<Task[]> {
    const response = await fetch(
        `${API_URL}/tasks`,
        {
            headers: getHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error('Failed to load tasks');
    }

    return response.json();
}

export async function createTask(description: string): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            description,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    return response.json();
}

export async function updateTask(
    id: string,
    completed: boolean,
): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({
            completed,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    return response.json();
}