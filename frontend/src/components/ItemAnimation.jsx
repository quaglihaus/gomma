import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box, IconButton, Toolbar, AppBar, Typography, Drawer, Stack, Card as MuiCard } from '@mui/material';


import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer'



export const ItemAnimation = ({ delay, animateInView, variant, threshold, oneTime, duration, bounce, children, ...rest }) => {

  let [counterViews, setCounterViews] = useState(0)
  let initial = {}
  let animate = {}
  let transition = {}

  if (variant === 'left') {
    initial = { x: '-100vw', opacity: 0 }
    animate = { x: 0, opacity: 1 }
    transition = { type: 'spring', duration: duration, bounce:bounce }
  } else if (variant === 'down') {
    initial = { x: 0, y: 80, opacity: 0 }
    animate = { x: 0, y: 0, opacity: 1 }
    transition = { type: 'spring', duration: duration, bounce: bounce }
  }
  else if (variant === 'up') {
    initial = { x: 0, y: -80, opacity: 0 }
    animate = { x: 0, y: 0, opacity: 1 }
    transition = { type: 'spring', duration: duration, bounce: bounce }
  } else if (variant === 'right') {
    initial = { x: '100vw', opacity: 0 ,rotate:0}
    animate = { x: 0, opacity: 1,rotate:0 }
    transition = { type: 'spring', duration: duration, bounce: bounce }}
  else {
    initial = { x: '-100vw', opacity: 0 }
    animate = { x: 0, opacity: 1 }
    transition = { type: 'spring', duration: duration, bounce: bounce }
  }



  const { ref, inView } = useInView({
    threshold: threshold
  });
  const animation = useAnimation();




  useEffect(() => {
    //initial.transition = transition
    animate.transition = transition
    if (counterViews > 0) {
      animate.transition.delay = 0
    } else {
      animate.transition.delay = delay
    }

    if (inView) {
      animation.start(animate)
      setCounterViews(counterViews + 1)
    }

    if (!inView) {
      if (!oneTime | counterViews === 0) {
        console.log('set initial:', initial)
        animation.start(initial)
      }
    }

  }, [inView, variant]);


  return (
    <div ref={ref}>

      <AnimatePresence mode='wait'>
        {animateInView ?
          <motion.div

            animate={animation}
          >
            {children}
          </motion.div> :
          <motion.div
            initial={initial}
            animate={animate}

            transition={{ ...transition, delay: delay }}
          >
            {children}
          </motion.div>}

      </AnimatePresence>
    </div>
  );
};

ItemAnimation.propTypes = {
  threshold: PropTypes.number,
  oneTime: PropTypes.bool,
  animateInView: PropTypes.bool,
  delay: PropTypes.number,
  duration:PropTypes.number,
  variant: PropTypes.oneOf(['left', 'down', 'large']),
  bounce:PropTypes.number,
};

ItemAnimation.defaultProps = {
  threshold: 0.2,
  oneTime: false,
  delay: 0,
  variant: 'left',
  animateInView: true,
  duration:1,
  bounce:0.3

};
