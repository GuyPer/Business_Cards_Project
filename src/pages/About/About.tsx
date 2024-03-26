import { useEffect } from 'react';
import './About.css';

export default function About() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='About Page'>
            <header>
                <h1 className='title'>About Us</h1>
            </header>
            <main>
                <section>
                    <h2>Our Mission</h2>
                    <p>Our company was founded to provide a platform for businesses to showcase their products and services, thereby increasing their exposure to potential customers. We have been growing steadily year by year, expanding our customer base and services to both businesses and non-business users.</p>
                </section>
                <section>
                    <h2>Key Features</h2>
                    <ul>
                        <li><strong>Business Promotion:</strong> We offer businesses a platform to promote their products and services to a wider audience.</li>
                        <li><strong>User Engagement:</strong> Our platform facilitates user engagement with businesses, allowing them to save their favorite businesses for future reference.</li>
                        <li><strong>Content Management:</strong> Users can easily manage their business profiles and content through our intuitive interface.</li>
                        <li><strong>Growth Opportunities:</strong> Our platform presents growth opportunities for businesses by connecting them with potential customers.</li>
                    </ul>
                </section>
            </main>
        </div>
    );
}