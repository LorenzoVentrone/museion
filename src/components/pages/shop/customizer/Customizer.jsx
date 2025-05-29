import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IoReload } from 'react-icons/io5';
import { useSnapshot } from 'valtio';
import { state } from './Store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cartStore } from '@/components/store/cartStore';
import CartDropdown from '@/components/utils/CartDropdown';

// Animation variants for framer-motion transitions
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

// Customizer component for the merch customizer page
export function Customizer() {
  const snap = useSnapshot(state);
  const [merchItems, setMerchItems] = useState([]);  

  // Fetch merch items from the API
  useEffect(() => {
    fetch('/api/merch')
      .then(res => res.json())
      .then(setMerchItems)
      .catch(() => setMerchItems([]));
  }, []);

  // Switch between shirt and hat models
  const handleSwitchModel = () => {
    state.model = snap.model === 'shirt' ? 'hat' : 'shirt';
  };

  // Add the current configuration to the cart
  const handleAddToCart = () => {
    const merchItem = merchItems.find(
      i =>
        i.type === snap.model &&
        i.color === snap.color &&
        String(i.logo) === String(snap.decal)
    );
    if (!merchItem) {
      alert('Error: merch not found!');
      return;
    }
    cartStore.addItem({
      item_id: merchItem.item_id,
      quantity: 1,
      type: merchItem.type,
      color: merchItem.color,
      logo: merchItem.logo,
      date: null,
      price: merchItem.price,
    });
  };

  // Prevent scrolling when the customizer is open
  useEffect(() => {
    document.body.classList.add('no-scroll');
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
        {/* Cart Dropdown */}
        <motion.div
          className="pointer-events-auto cursor-pointer absolute top-10 right-10 z-10"
          variants={fromRightVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <CartDropdown />
        </motion.div>

        {/* Go Back Button */}
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

        {/* Color Options */}
        <div className="color-options pointer-events-auto flex items-center gap-2">
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
          <motion.div
            className="flex items-center gap-2 color-btns-stack"
            variants={fromBottomVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              ...fromBottomVariant.visible.transition,
              delay: snap.colors.length * 0.07
            }}
          >
            <motion.button
              className="custom-btn color-circle-btn pointer-events-auto"
              style={{
                background: snap.color,
                color: snap.color && snap.color.toLowerCase() === '#fff' ? '#222' : '#fff'
              }}
              variants={fromBottomVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.1 }}
              onClick={handleAddToCart}
              title="Add the current configuration to the cart"
            >+</motion.button>
            <motion.button
              className="custom-btn color-circle-btn pointer-events-auto"
              style={{
                background: snap.color,
                color: snap.color && snap.color.toLowerCase() === '#fff' ? '#222' : '#fff'
              }}
              variants={fromBottomVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                const merchItem = merchItems.find(
                  i =>
                    i.type === snap.model &&
                    i.color === snap.color &&
                    String(i.logo) === String(snap.decal)
                );
                if (!merchItem) return;
                cartStore.removeItem({
                  item_id: merchItem.item_id,
                  type: merchItem.type,
                  color: merchItem.color,
                  logo: merchItem.logo,
                  date: null,
                });
              }}
              title="Remove the current configuration from the cart"
            >−</motion.button>
          </motion.div>
        </div>

        {/* Logo Options */}
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
  );
}