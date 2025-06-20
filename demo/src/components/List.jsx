import { useState } from 'react';
// Import regular CSS
import '../styles/List.css';
// Import CSS Module
import styles from '../styles/List.module.css';

function List() {
    const [items] = useState([
        { id: 1, text: 'Item 1' },
        { id: 3, text: 'Item 3' },
        { id: 2, text: 'Item 2' },
    ]);

    // Inline styles - defined as JavaScript objects
    const inlineStyles = {
        container: {
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            margin: '20px 0',
            backgroundColor: '#f9f9f9'
        },
        heading: {
            color: '#333',
            borderBottom: '2px solid #4CAF50',
            paddingBottom: '10px'
        },
        listItem: {
            padding: '8px',
            margin: '5px 0',
            backgroundColor: '#e9e9e9',
            borderRadius: '3px'
        }
    };

    return (
        <div>
            <h2>Styling in React</h2>

            {/* 1. Inline Styles Example */}
            <div style={inlineStyles.container}>
                <h3 style={inlineStyles.heading}>1. Inline Styles</h3>
                <ul>
                    {items.map((item) => (
                        <li key={item.id} style={inlineStyles.listItem}>
                            {item.text} (ID: {item.id})
                        </li>
                    ))}
                </ul>
            </div>

            {/* 2. Regular CSS Example */}
            <div className="list-container">
                <h3 className="list-heading">2. Regular CSS</h3>
                <ul className="list">
                    {items.map((item) => (
                        <li key={item.id} className="list-item">
                            {item.text} (ID: {item.id})
                        </li>
                    ))}
                </ul>
            </div>

            {/* 3. CSS Modules Example */}
            <div className={styles.container}>
                <h3 className={styles.heading}>3. CSS Modules</h3>
                <ul className={styles.list}>
                    {items.map((item) => (
                        <li key={item.id} className={styles.item}>
                            {item.text} (ID: {item.id})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default List;