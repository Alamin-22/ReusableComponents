import { useState } from 'react';

const DomainExtractor = () => {
    const [url, setUrl] = useState('');
    const [domain, setDomain] = useState('');

    const handleInputChange = (e) => {
        setUrl(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const parsedUrl = new URL(url); 
            const domainName = parsedUrl.hostname;  
            setDomain(domainName);
        } catch (error) {
            setDomain('Invalid URL');
        }
    };

    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={url}
                    onChange={handleInputChange}
                    placeholder="Enter product URL"
                    required className='input input-bordered my-3'
                />
                <button type="submit" className='btn  btn-primary'>Extract Domain</button>
            </form>
            {domain && <p>Domain: {domain}</p>}
        </div>
    );
};

export default DomainExtractor;