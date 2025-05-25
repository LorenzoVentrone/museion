import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineArrowLeft, AiOutlineShopping } from 'react-icons/ai'
import { IoReload } from 'react-icons/io5'
import { useSnapshot } from 'valtio'
import { state } from './Store'
import Link from 'next/link'
import { useEffect } from 'react'

// Variants for the animations
const fromRightVariant = {
    hidden: { opacity: 0, x: 1000 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.4, 0.2, 0.2, 1] } }
};

const fromLeftVariant = {
    hidden: { opacity: 0, x: -1000 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.4, 0.2, 0.2, 1] } }
};

const fromBottomVariant = {
    hidden: { opacity: 0, y: 1000 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.4, 0.2, 0.2, 1] } }
};

export function Customizer() {
    const snap = useSnapshot(state)
    const handleSwitchModel = () => {
        state.model = snap.model === 'shirt' ? 'hat' : 'shirt'
    }
    useEffect(() => {
        // Blocca lo scroll quando il Customizer è montato
        document.body.classList.add('no-scroll');
        // Ripristina lo scroll quando il Customizer si smonta
        return () => document.body.classList.remove('no-scroll');
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                key="customizer"
                className="customizer"
                style={{ pointerEvents: 'none' }}
                variants={fromBottomVariant}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                {/* Carrello */}
                <motion.div
                    className="pointer-events-auto cursor-pointer absolute top-10 right-10 z-10"
                    variants={fromRightVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={() => alert('Carrello aperto!')}
                >
                    <AiOutlineShopping size="3em" color='black' />
                </motion.div>

                {/* GoBack Button */}
                <Link
                    href="/shop/tickets"
                    className="pointer-events-auto absolute top-10 left-10 z-10"
                    style={{ textDecoration: 'none' }}
                >
                    <motion.button
                        className="exit custom-btn pointer-events-auto"
                        style={{ background: snap.color }}
                        variants={fromLeftVariant}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <AiOutlineArrowLeft size="1.3em" />
                        Go Back
                    </motion.button>
                </Link>

                {/* Color Option */}
                <div className="color-options pointer-events-auto"

                >
                    {snap.colors.map((color) => (
                        <motion.div
                            key={color}
                            className="circle pointer-events-auto"
                            style={{ background: color }}
                            variants={fromBottomVariant}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onClick={() => (state.color = color)}
                        ></motion.div>
                    ))}
                </div>

                {/* Logo Option */}
                <motion.div className="decals pointer-events-auto"
                    variants={fromBottomVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <div className="decals--container">
                        {snap.decals.map((decal) => (
                            <motion.div
                                key={decal}
                                className="decal pointer-events-auto"
                                variants={fromBottomVariant}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                onClick={() => (state.decal = decal)}
                            >
                                <img src={`/images/models_logo/${decal}_thumb.png`} alt="brand" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Switch Model Button */}
                <motion.button
                    className="share custom-btn"
                    style={{ background: snap.color, pointerEvents: 'auto' }}
                    variants={fromRightVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={handleSwitchModel}
                >
                    {snap.model === 'shirt' ? 'Hat' : 'T-shirt'}
                    <IoReload size="1.3em" className='left-8' />
                </motion.button>
            </motion.div>
        </AnimatePresence>
    )
}