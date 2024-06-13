import './Documents.css'
import Navbar from './Components/Navbar/Navbar'
import DocumentCard from './Components/DocumentCard/DocumentCard'

import logo from '../../assets/react.svg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react'

export default function Documents(props) {

    const [name, setName] = useState(props.user.name);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/mixed/${props.user.username}/GetDocuments`);
                if (!response.ok) {
                    throw new Error('Failed to fetch documents');
                }
                const data = await response.json();
                setDocuments(data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };
        fetchDocuments();
    }, []);

    return (
        <div>
            <ToastContainer />
            <Navbar
                name={name}
                username={props.user.username}
                password={props.user.password}
                setName={setName}
                setUser={props.setUser}
                setDocuments={setDocuments}
            />
            <div className='section'>
                <h2 className='section-headers'>YOUR DOCUMENTS</h2>
                <div className='document-list'>
                    {documents.filter(document => document.accessType === 'OWNER').length === 0 ?
                        (<h2 className='no-documents'>No Documents Available</h2>)
                            :
                        (documents.filter(document => document.accessType === 'OWNER').map((document, key) => (
                            <div key={key}>
                                <DocumentCard
                                    title={document.title}
                                    description={document.description}
                                    isViewer={false}
                                />
                            </div> 
                    )))}
                </div>
            </div>
            <div className='section'>
                <h2 className='section-headers'>SHARED DOCUMENTS</h2>
                <div className='document-list'>
                    {documents.filter(document => document.accessType !== 'OWNER').length === 0 ?
                        (<h2 className='no-documents'>No Documents Available</h2>)
                            :
                        (documents.filter(document => document.accessType !== 'OWNER').map((document, key) => (
                            <div key={key}>
                                <DocumentCard
                                    title={document.title}
                                    description={document.description}
                                    isViewer={false}
                                />
                            </div> 
                    )))}
                </div>
            </div> 
        </div>
    )
}