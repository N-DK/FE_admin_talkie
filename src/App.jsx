import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { NavigateProvider } from './provider/NavigateProvider';
import { ConfigProvider, message, Modal, theme } from 'antd';
import { useMessage } from './hooks/useMessage';
import { useModal } from './hooks/useModal';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from './assets/themes';
import NotFound from './components/NotFound';

function App() {
    const [messageApi, contextMsgHolder] = message.useMessage();
    const [modal, contextModalHolder] = Modal.useModal();
    const { theme: themeRedux } = useSelector((state) => state.theme);

    useMessage(messageApi);
    useModal(modal);

    return (
        <>
            <ConfigProvider
                theme={{
                    algorithm:
                        themeRedux === 'light'
                            ? theme.defaultAlgorithm
                            : theme.darkAlgorithm,
                }}
            >
                <BrowserRouter>
                    <Routes>
                        {routes.map((route, index) => {
                            const Layout = route.layout;
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <NavigateProvider>
                                            <Layout>
                                                {Page ? <Page /> : null}
                                            </Layout>
                                        </NavigateProvider>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </BrowserRouter>
                {contextMsgHolder}
                {contextModalHolder}
            </ConfigProvider>
        </>
    );
}

export default App;
