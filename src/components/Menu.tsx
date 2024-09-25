import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote } from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { heartOutline, heartSharp, mailOutline, mailSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
}

const appPages: AppPage[] = [
	{
		title: 'Products',
		url: '/folder/Inbox',
		iosIcon: mailOutline,
		mdIcon: mailSharp,
	},
	{
		title: 'Favorites',
		url: '/folder/Favorites',
		iosIcon: heartOutline,
		mdIcon: heartSharp,
	},
];

const Menu: React.FC = () => {
	const location = useLocation();

	return (
		<IonMenu contentId='main' type='overlay'>
			<IonContent>
				<IonList id='inbox-list'>
					<IonListHeader>testAPP</IonListHeader>
					<IonNote>hi@user.com</IonNote>
					{appPages.map((appPage, index) => {
						return (
							<IonMenuToggle key={index} autoHide={false}>
								<IonItem
									className={location.pathname === appPage.url ? 'selected' : ''}
									routerLink={appPage.url}
									routerDirection='none'
									lines='none'
									detail={false}
								>
									<IonIcon aria-hidden='true' slot='start' ios={appPage.iosIcon} md={appPage.mdIcon} />
									<IonLabel>{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
					})}
				</IonList>
			</IonContent>
		</IonMenu>
	);
};

export default Menu;
