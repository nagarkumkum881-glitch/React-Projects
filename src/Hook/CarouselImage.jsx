import React, { useEffect, useState } from 'react'
import Carousel from '../Components/Carousel';

const CarouselImage = () => {
    const [image, setImage] = useState([]);

    async function getData() {
        try {
            let apiData = await fetch(`https://picsum.photos/v2/list?page=1&limit=5`);
            let jsonData = await apiData.json();

            let imageUrl = jsonData.map((item) => item.download_url);
            setImage(imageUrl);
        } catch (error) {
            console.log("Error fetching images:", error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            {image.length > 0 ? (
                <Carousel images={image} />
            ) : (
                <div>Loading images...</div>
            )}
        </div>
    )
}

export default CarouselImage