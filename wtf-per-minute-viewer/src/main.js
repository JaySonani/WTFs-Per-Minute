import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex';
import axios from "axios";
import {filter, first} from "lodash";

// Create a new store instance.
const store = createStore({
    state () {
        return {
            projects: [],
            events: [],
            selectedProject: null,
        }
    },
    getters: {
        getProjects(state) {
            return state.projects;
        },
        getEventsOfProject(state) {
            return filter(state.events, (event) => {
                // noinspection JSUnresolvedVariable
                return event.project === state.selectedProject;
            });
        },
        getSelectedProject(state) {
            return state.selectedProject;
        },
        getProjectName(state) {
            const project = first(filter(state.projects, (project) => { return state.selectedProject === project.uuid; }));
            return project.name;
        },
    },
    mutations: {
        setProjects(state, projects) {
            state.projects = projects;
        },
        setEvents(state, events) {
            state.events = events;
        },
        selectProject(state, projectUuid) {
            state.selectedProject = projectUuid;
        }
    },
    actions: {
        async fetchProjects(context) {
            const projectsResponse = await axios.get('https://northamerica-northeast1-hackday-dec-2022.cloudfunctions.net/wtf-per-minute-project-lister');
            context.commit('setProjects', projectsResponse.data);
        },
        async fetchEventsForProject(context, project) {
            const eventsResponse = await axios.get(`https://northamerica-northeast1-hackday-dec-2022.cloudfunctions.net/wtf-per-minute-event-lister?project=${project}`);
            context.commit('setEvents', eventsResponse.data);
        },
    }
});

const app = createApp(App);
app.use(store);
app.mount('#app');