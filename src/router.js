import Vue from 'vue';
import Router from 'vue-router';

import store from './store'

import Authentication from './views/authentication';
import Event from './views/event';
import Home from './views/home';
import Profile from './views/profile';
import EventCreation from './views/event-creation';
import Analytics from './views/analytics';
import MyEvent from './views/myevents';

import net from './helpers/network';

Vue.use(Router);

function ifNotAuthenticated(to, from, next) {
    if (!store.getters.isAuthenticated) {
        return net.get('/users/current').then(res => {
            if (!res.data.error)
                net.get(`/users/${res.data.id}`).then(res => {
                    store.commit(`setUser`, res.data);
                    next('/home');
                }).catch(_ => next());
            else
                next();
        }).catch(_ => next());
    }
    next(`/`);
}

function ifAuthenticated(to, from, next) {
    if (store.getters.isAuthenticated) {
        next();
    } else {
        next(`/authentication`);
    }
}

export default new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'home' },
        },
        {
            path: '/authentication',
            name: 'authentication',
            component: Authentication,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            props: true,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/event/:id',
            name: 'event',
            component: Event,
            props: true,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            props: true,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/event-creation',
            name: 'event-creation',
            component: EventCreation,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/analytics',
            name: 'analytics',
            component: Analytics,
            props: true,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/myevents',
            name: 'myevents',
            component: MyEvent,
            beforeEnter: ifAuthenticated
        }
    ]
});