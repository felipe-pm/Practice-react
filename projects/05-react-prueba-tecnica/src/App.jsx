import { useEffect, useState } from 'react'
import './App.css' 

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = `https://cataas.com`

export function App () {
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [factError, setFactError] = useState()

    // Para recuperar la cita al cargar la pagina
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => {
                if (!res.ok) {
                    throw new Error('No se pudo recuperar la cita')
                }
                return res.json()
            })
            .then(data => {
                const { fact } = data
                setFact(fact)
        })
        .catch(err => {
            // Tanto si hay error con la respuesta, como si hay error con la petición
            setFactError('No se pudo recuperar la cita')
        })
    }, [])

    // Para recuperar la imagen cada vez que tenemos una nueva cita
    useEffect(() => {
        if (!fact) return
        const threeFirstWords = fact.split(' ', 3).join(' ')
        console.log(threeFirstWords)
        fetch(`https://cataas.com/cat/says/${threeFirstWords}?json=true`)
            .then(res => res.json())
            .then(response => {
                const { _id } = response
                const url = `/cat/${_id}/says/${threeFirstWords}?fontSize=50&fontColor=white&width=500&height=500`
                setImageUrl(url)
            })
    }, [fact])

    return (
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words for ${fact} `} />}
        </main>
    )
}