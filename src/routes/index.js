import NotFound from '../components/NotFound';
import { routeConfig } from '../configs/routeConfig';
import LoginLayout from '../layouts/LoginLayout';
import MainLayout from '../layouts/MainLayout';
import { BasicConfiguration } from '../pages/BasicConfiguration';
import { ChannelManager } from '../pages/ChannelManager';
import { Login } from '../pages/Login';
import { OTPEmailConfiguration } from '../pages/OTPEmailConfiguration';
import { PostsManager } from '../pages/PostsManager';
import { RootPage } from '../pages/Root';
import { SendEmailConfiguration } from '../pages/SendEmailConfiguration';
import { UserManager } from '../pages/UserManager';

export const routes = [
    {
        path: routeConfig?.login,
        component: Login,
        layout: LoginLayout,
    },
    {
        path: routeConfig?.root,
        component: RootPage,
        layout: MainLayout,
    },
    {
        path: routeConfig?.postsManager,
        component: PostsManager,
        layout: MainLayout,
    },
    {
        path: routeConfig?.userManager,
        component: UserManager,
        layout: MainLayout,
    },
    {
        path: routeConfig?.channelManager,
        component: ChannelManager,
        layout: MainLayout,
    },
    {
        path: routeConfig?.basicConfiguration,
        component: BasicConfiguration,
        layout: MainLayout,
    },
    {
        path: routeConfig?.sendEmailConfiguration,
        component: SendEmailConfiguration,
        layout: MainLayout,
    },
    {
        path: routeConfig?.otpEmailConfiguration,
        component: OTPEmailConfiguration,
        layout: MainLayout,
    },
    {
        path: '*',
        component: NotFound,
        layout: MainLayout,
    },
];
