import styles from './Home.module.css';

import savings from '../../images/savings.svg';
import LinkButton from '../layout/LinkButton';
function Home() {
    return (
        <section className={styles.homeContainer}>
            <h1>Bem-vindo ao <span>SGCP - Sistema de Gerênciamento de Custos em Projetos</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Projeto" />
            <img src={savings} alt="Imagem da página Home" />
        </section>
    );
}

export default Home;