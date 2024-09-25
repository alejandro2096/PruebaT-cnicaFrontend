import React, { useState } from 'react';
import {
	IonButton,
	IonButtons,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonContent,
	IonGrid,
	IonHeader,
	IonImg,
	IonMenuButton,
	IonPage,
	IonSelect,
	IonSelectOption,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import { useWishlist } from '../context/WishlistProvider';

const WishlistPage: React.FC = () => {
	const { wishlist, removeFromWishlist } = useWishlist();
	const [sortCriteria, setSortCriteria] = useState<string>('name'); // Estado para el criterio de ordenación

	// Función para ordenar los productos deseados
	const sortWishlist = (wishlist: any[], criteria: string) => {
		switch (criteria) {
			case 'name':
				return wishlist.sort((a, b) => a.title.localeCompare(b.title));
			case 'price':
				return wishlist.sort((a, b) => a.price - b.price);
			case 'date':
				return wishlist.sort((a, b) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime());
			default:
				return wishlist;
		}
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{'My Wishlist'}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{/* Selector de ordenación */}
				<IonSelect value={sortCriteria} placeholder='Sort by' onIonChange={(e) => setSortCriteria(e.detail.value)}>
					<IonSelectOption value='name'>Name</IonSelectOption>
					<IonSelectOption value='price'>Price</IonSelectOption>
					<IonSelectOption value='date'>Date Added</IonSelectOption>
				</IonSelect>

				{wishlist.length > 0 ? (
					sortWishlist(wishlist, sortCriteria).map((product) => (
						<IonCard key={product.id}>
							<IonImg src={product.images[0]} alt={product.title} />
							<IonCardHeader>
								<IonCardSubtitle>Price: ${product.price}</IonCardSubtitle>
								<IonCardTitle>{product.title}</IonCardTitle>
							</IonCardHeader>
							<IonCardContent>
								{product.description}
								<IonButton color='danger' onClick={() => removeFromWishlist(product.id)}>
									Remove from Wishlist
								</IonButton>
							</IonCardContent>
						</IonCard>
					))
				) : (
					<p>No products in your wishlist.</p>
				)}
			</IonContent>
		</IonPage>
	);
};

export default WishlistPage;
