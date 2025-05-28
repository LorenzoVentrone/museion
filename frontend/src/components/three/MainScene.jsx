'use client';

import { useState } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import RectangleRoom from '../floorplan/RectangleRoom';
import Dome from '../floorplan/Dome'
import ScrollContainer from '../controls/ScrollContainer';


import { CenterModel } from '../models/CenterModel';
import { SeymourDamer } from '../models/SeymourDamer';
import { Garden } from '../models/Garden';
import { VictorianPainting } from '../models/VictorianPainting';
import { ApolloStatue } from '../models/ApolloStatue';
import { IndoorPlant } from '../models/IndoorPlant';
import { Chandelier } from '../models/Chandelier';
import { ThaliaStatue } from '../models/ThaliaStatue';
import { ThreeGracesStatue } from '../models/ThreeGracesStatue';
import { PollockP1 } from '../models/PollockP1';
import { PollockP2 } from '../models/PollockP2';
import { PollockP3 } from '../models/PollockP3';
import { PollockP4 } from '../models/PollockP4';
import { PollockP5 } from '../models/PollockP5';
import { DeathP } from '../models/DeathP';
import { CartoonTree } from '../models/CartoonTree';
import { GaulsStatue } from '../models/GaulsStatue';
import { LionStatue } from '../models/LionStatue';
import { NikeStatue } from '../models/NikeStatue';
import { StarDecor } from '../models/StarDecor';
import { SmoothRock } from '../models/SmoothRock';
import { LeatherSofa } from '../models/LeatherSofa';
import { AthenaAltar } from '../models/AthenaAltar';
import { Showcase } from '../models/Showcase';
import { PicassoP1 } from '../models/PicassoP1';
import { PicassoP2 } from '../models/PicassoP2';
import { VanGoghP1 } from '../models/VanGoghP1';



export default function MainScene() {
  // Allora cosi non lagga, ma a me serve più in alto nel codice lo scrollValue, cosi da poterlo usare dentro homepage
  const [scrollValue, setScrollValue ] = useState(0);
  return (
    <>
      {/* Camera inside the rectangle */}
      <PerspectiveCamera makeDefault fov={70} position={[0, 2, 60]} />
      
      <ScrollContainer onScroll={setScrollValue}>
        {() => (
          <>
            {/* Geometry */}
            <RectangleRoom />
            <Garden />
            <Dome />
            <CartoonTree />
            {/* Furniture */}
            <IndoorPlant />
            <IndoorPlant position={[12, 0, 0]} />
            <Chandelier />
            <StarDecor />
            <SmoothRock />
            <LeatherSofa />
            {/* Models */}
            <CenterModel />
            <SeymourDamer />
            <ApolloStatue />
            <VictorianPainting />
            <ThaliaStatue />
            <ThreeGracesStatue />
            <GaulsStatue />
            <LionStatue />
            <NikeStatue />
            <AthenaAltar />
            <Showcase />
            {/* Paintings */}
            <DeathP />
            <PollockP1 />
            <PollockP2 />
            <PollockP3 />
            <PollockP4 />
            <PollockP5 />
            <PicassoP1 />
            <PicassoP2 />
            <VanGoghP1 />
          </>
        )}
      </ScrollContainer>
    </>
  );
}