import React from 'react'

interface SearchProps {

}

export const Search: React.FC<SearchProps> = ({}) => {
        return (
            <div>
                <input type="text" className="searchInput"></input>
                <button className="searchButton">Search</button>
            </div>
        );
}