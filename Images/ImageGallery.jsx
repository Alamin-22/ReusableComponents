import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ImageGallery = ({ images, initialIndex = 0, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(images[initialIndex]);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Ref to store the updated position
    const positionRef = useRef(position);

    // Update the position reference during the drag
    const updatePosition = ({ x, y }) => {
        positionRef.current = { x, y };
        setPosition({ x, y });
    };

    // Navigate to the next image
    const nextImage = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[newIndex]);
        setCurrentIndex(newIndex);
        resetImage(); // Reset zoom and position when changing images
    };

    // Navigate to the previous image
    const prevImage = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[newIndex]);
        setCurrentIndex(newIndex);
        resetImage(); // Reset zoom and position when changing images
    };

    // Zoom in and out functions
    const zoomIn = () => setZoomLevel(prevZoom => Math.min(prevZoom + 0.2, 3));
    const zoomOut = () => setZoomLevel(prevZoom => Math.max(prevZoom - 0.2, 1));

    // Reset image to its natural size and position
    const resetImage = () => {
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
    };

    // Smooth dragging with requestAnimationFrame
    const handleMouseMove = (e) => {
        if (isDragging) {
            e.preventDefault(); // Prevent text selection or default drag behavior
            const newX = e.clientX - dragStart.x;
            const newY = e.clientY - dragStart.y;
            requestAnimationFrame(() => {
                updatePosition({ x: newX, y: newY });
            });
        }
    };

    // Smooth dragging for touch events
    const handleTouchMove = (e) => {
        if (isDragging && e.touches.length === 1) {
            const touch = e.touches[0];
            const newX = touch.clientX - dragStart.x;
            const newY = touch.clientY - dragStart.y;
            requestAnimationFrame(() => {
                updatePosition({ x: newX, y: newY });
            });
        }
    };

    // Handle keydown events for navigation and zoom
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === '+') zoomIn();
            if (e.key === '-') zoomOut();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, zoomLevel]);

    // Reset position when zoom level is 1
    useEffect(() => {
        if (zoomLevel === 1) setPosition({ x: 0, y: 0 });
    }, [zoomLevel]);

    // Handle mouse down event to start dragging
    const handleImageMouseDown = (e) => {
        if (zoomLevel > 1) {
            e.preventDefault(); // Prevent browser's default behavior
            setIsDragging(true);
            setDragStart({ x: e.clientX - positionRef.current.x, y: e.clientY - positionRef.current.y });
        }
    };

    // Handle touch start to start dragging
    const handleImageTouchStart = (e) => {
        if (zoomLevel > 1 && e.touches.length === 1) {
            const touch = e.touches[0];
            setIsDragging(true);
            setDragStart({ x: touch.clientX - positionRef.current.x, y: touch.clientY - positionRef.current.y });
        }
    };

    // Handle mouse up event to stop dragging
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Handle touch end to stop dragging
    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Ensure dragging stops even if the mouse is released outside the image
    useEffect(() => {
        const handleMouseUpOutside = () => {
            setIsDragging(false);
        };

        window.addEventListener('mouseup', handleMouseUpOutside);
        window.addEventListener('touchend', handleMouseUpOutside); // Also listen for touchend events

        return () => {
            window.removeEventListener('mouseup', handleMouseUpOutside);
            window.removeEventListener('touchend', handleMouseUpOutside);
        };
    }, []);

    // Prevent scrolling globally when gallery is open
    useEffect(() => {
        const handleScrollBlock = (e) => e.preventDefault();
        
        if (isDragging || zoomLevel > 1) {
            document.body.classList.add('prevent-scroll'); // Add class to prevent scrolling
            window.addEventListener('touchmove', handleScrollBlock, { passive: false }); // Block touchmove events globally
        } else {
            document.body.classList.remove('prevent-scroll'); // Remove class
            window.removeEventListener('touchmove', handleScrollBlock); // Remove touchmove event listener
        }

        return () => {
            document.body.classList.remove('prevent-scroll'); // Cleanup when modal is closed
            window.removeEventListener('touchmove', handleScrollBlock);
        };
    }, [isDragging, zoomLevel]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            <div className="relative w-96 h-64 md:w-[600px] md:h-[400px] overflow-hidden rounded-md bg-gray-200">
                <button onClick={onClose}
                    className="z-50 absolute top-2 right-2 bg-white rounded-full text-black text-2xl">
                    <IoIosCloseCircleOutline />
                </button>

                <div className={`flex items-center justify-center h-full w-full ${zoomLevel > 1 ? "cursor-grab active:cursor-grabbing" : ""} rounded-md`}
                    style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`, transition: isDragging ? 'none' : 'transform 0.3s ease-out', transformOrigin: 'center center' }}
                    onMouseDown={handleImageMouseDown}
                    onTouchStart={handleImageTouchStart}>
                    <Image
                        src={selectedImage}
                        alt="Selected Image"
                        layout="fill"
                        objectFit="contain"
                        className="w-full rounded-md"
                    />
                </div>

                <button onClick={zoomIn}
                    className="absolute bottom-4 left-4 bg-white text-black px-2 py-1 rounded-md">
                    <FiZoomIn className="text-xl" />
                </button>
                <button onClick={zoomOut}
                    className="absolute bottom-4 left-16 bg-white text-black px-2 py-1 rounded-md">
                    <FiZoomOut className="text-xl" />
                </button>

                <button onClick={resetImage}
                    className="absolute bottom-4 right-2 bg-white text-black px-2 py-1 rounded-md">
                    Reset
                </button>

                <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl">‹</button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl">›</button>
            </div>
        </div>
    );
};

export default ImageGallery;
