import React, { useEffect, useState } from 'react';
import {
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonCard,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCardContent,
	IonImg,
	IonSpinner,
	IonButton,
	IonToast,
} from '@ionic/react';
import './Page.css';
import { useWishlist } from '../context/WishlistProvider';

interface Props {
	title: string;
}

interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	images: string[];
}

const Page: React.FC<Props> = ({ title }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null); // Estado para errores

	const { addToWishlist, removeFromWishlist, isProductInWishlist } = useWishlist(); // Usar el context

	useEffect(() => {
		// Fetch the products from the API
		fetch('https://api.escuelajs.co/api/v1/products')
			.then((response) => response.json())
			.then((data) => {
				setProducts(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching products:', error);
				setLoading(false);
			});
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{title}</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				{/* Mostrar spinner mientras los productos se cargan */}
				{loading && <IonSpinner name='crescent' />}
				{/* Mostrar error si ocurre un problema */}
				{error && (
					<IonToast
						isOpen={!!error}
						message={error}
						duration={5000}
						position='top'
						color='danger'
						onDidDismiss={() => setError(null)} // Limpiar error al cerrar el toast
					/>
				)}
				<>
					{!loading &&
						!error &&
						products.map((product) => (
							<IonCard key={product.id}>
								<IonImg src={product.images[0]} alt={product.title} />
								<IonCardHeader>
									<IonCardSubtitle>Price: ${product.price}</IonCardSubtitle>
									<IonCardTitle>{product.title}</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									{product.description}
									{/* Botón para agregar o eliminar de la lista de deseos */}
									{isProductInWishlist(product.id) ? (
										<IonButton color='danger' onClick={() => removeFromWishlist(product.id)}>
											Remove from Wishlist
										</IonButton>
									) : (
										<IonButton color='primary' onClick={() => addToWishlist(product)}>
											Add to Wishlist
										</IonButton>
									)}
								</IonCardContent>
							</IonCard>
						))}
				</>
			</IonContent>
		</IonPage>
	);
};

export default Page;
