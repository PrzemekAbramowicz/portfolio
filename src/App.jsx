import './App.scss';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio/Portfolio';
import Skills from './components/Skills/Skills';
import ScrollAurora from './components/ScrollAurora';

function App() {
	return (
		<>
			<Header />
			<Hero />
			<div className='page-sections'>
			<ScrollAurora />
			<Portfolio />
			<Skills />
			{/* <Testimonials /> */}
			<Contact />
			<Footer />
			</div>
		</>
	);
}

export default App;
