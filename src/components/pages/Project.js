import { parse, v4 as uuidv4 } from 'uuid';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';

import ProjectForm from '../project/ProjectForm';

import ServiceForm from '../service/ServiceForm';

import styles from './Project.module.css';

function Project() {

    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data);
                })
                .catch((error) => console.log(error))
        }, 500);

    }, [id]);

    function createService(project) {
        setMessage('');
        //Last service
        const lastService = project.services[project.services.length - 1];
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        //Maximum value validation
        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço');
            setMessageType('error');
            project.services.pop();
            return false;
        }

        //Add service cost to project total cost
        project.cost = newCost;

        //Update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                //Exibir os serviços
                console.log(data);
            })
            .catch((err) => console.log(err))
    }

    function toogleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toogleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    function editPost(project) {
        setMessage('');
        //Budget Validation
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!');
            setMessageType('error');
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setShowProjectForm(false);
                setMessage('Projeto atualizado com sucesso!');
                setMessageType('success');
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            {project.name ? (
                <div className={styles.projectDetails}>
                    <Container customClass="column">
                        {message && <Message type={messageType} msg={message} />}
                        <div className={styles.detailsContainer}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toogleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar Projeto'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.projectInfo}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total do Orçamento:</span> R$ {project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R$ {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.projectInfo}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir Edição"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.serviceFormContainer}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toogleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar Serviço'}
                            </button>
                            <div className={styles.projectInfo}>
                                {showServiceForm && (
                                    <ServiceForm 
                                        handleSubmit={createService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            <p>Itens do Serviço</p>
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Project;