import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import WishlistPage from './pages/WishListPage';
import { WishlistProvider } from './context/WishlistProvider';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
	return (
		<WishlistProvider>
			<IonApp>
				<IonReactRouter>
					<IonSplitPane contentId='main'>
						<Menu />
						<IonRouterOutlet id='main'>
							<Route path='/' exact>
								<Redirect to='/folder/Inbox' />
							</Route>

							{/* Ruta para página de productos */}
							<Route path='/folder/Inbox' exact>
								<Page title={'Products'} />
							</Route>

							{/* Ruta para la página de favoritos */}
							<Route path='/folder/Favorites'>
								<WishlistPage />
							</Route>
						</IonRouterOutlet>
					</IonSplitPane>
				</IonReactRouter>
			</IonApp>
		</WishlistProvider>
	);
};

export default App;
