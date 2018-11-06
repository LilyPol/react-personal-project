import { MAIN_URL, TOKEN } from './config';

export const api = {    

    async createTask (message) {
        const response = await fetch(`${MAIN_URL}`, {
            method:  'POST',
            headers: {
                Authorization:  TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (response.status !== 200) {
            throw new Error('Error in "createTask"');
        }

        const { data: task } = await response.json();

        return task;
    },

    async updateTask (taskProps) {
        const response = await fetch(`${MAIN_URL}`, {
            method:  'PUT',
            headers: {
                Authorization:  TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([taskProps]),
        });

        if (response.status !== 200) {
            throw new Error('Error in "updateTask"');
        }
    },

    async removeTask (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 204) {
            throw new Error('Error in "removeTask"');
        }
    },

    async fetchTasks () {
        const response = await fetch(`${MAIN_URL}`, {
            method:  'GET',
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 200) {
            throw new Error('Error in "fetchTasks"');
        }

        const { data: tasks } = await response.json();

        return tasks;
    },
    
    async completeAllTasks (tasksList) {
        const tasksFetch =  tasksList.map((taskProps) => {
            return fetch(`${MAIN_URL}`, {
                method:  'PUT',
                headers: {
                    Authorization:  TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([taskProps]),
            });
        });

        await Promise.all(tasksFetch).then(
            (resolve) => {
                resolve.forEach((response) => {
                    if (response.status !== 200) {
                        throw new Error('Error in "completeAllTasks"');
                    }
                });
            },
            (error) => `Error in "completeAllTasks" ${error.message}`
        );
    },
};
