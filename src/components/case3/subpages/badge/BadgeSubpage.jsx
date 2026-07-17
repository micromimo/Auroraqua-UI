import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeInCard } from '../../../ui/animations';
import BadgeUploader from './BadgeUploader';
import BadgeMaterialSelector from './BadgeMaterialSelector';
import BadgeShapeSelector from './BadgeShapeSelector';
import BadgeEffectControls from './BadgeEffectControls';
import BadgePreview from './BadgePreview';
import BadgeExport from './BadgeExport';
import { SHAPES } from './BadgeShapeSelector';
import { MATERIALS } from './BadgeMaterialSelector';

const initialShapes = SHAPES.reduce((acc, s) => ({ ...acc, [s.id]: s }), {});
const initialMaterials = MATERIALS.reduce((acc, m) => ({ ...acc, [m.id]: m }), {});

export default function BadgeSubpage() {
  const [image, setImage] = useState(null);
  const [material, setMaterial] = useState('sparkle');
  const [shape, setShape] = useState('3-2');
  const [effects, setEffects] = useState({
    glow: 'medium',
    shadow: 'soft',
    highlight: 'top',
  });

  const shapeData = initialShapes[shape] || initialShapes['3-2'];
  const materialData = initialMaterials[material] || initialMaterials['sparkle'];

  return (
    <div className="h-full flex flex-col gap-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-heading">Badge Inspect</h2>
        <p className="text-sm text-muted mt-1">
          制作赛博吧唧，支持多种材质、形状和效果
        </p>
      </motion.div>

      <div className="flex-1 flex gap-5 min-h-0">
        {/* Left Panel - Controls */}
        <div className="w-[420px] flex-shrink-0 flex flex-col gap-4 overflow-y-auto p-3">
          <FadeInCard className="liquid-glass rounded-2xl p-5 space-y-5" delay={0.1}>
            <BadgeUploader
              image={image}
              onImageChange={setImage}
              onImageRemove={() => setImage(null)}
            />
          </FadeInCard>

          <FadeInCard className="liquid-glass rounded-2xl p-5 space-y-5" delay={0.2}>
            <BadgeMaterialSelector material={material} onMaterialChange={setMaterial} />
          </FadeInCard>

          <FadeInCard className="liquid-glass rounded-2xl p-5 space-y-5" delay={0.3}>
            <BadgeShapeSelector shape={shape} onShapeChange={setShape} />
          </FadeInCard>

          <FadeInCard className="liquid-glass rounded-2xl p-5 space-y-5" delay={0.4}>
            <BadgeEffectControls effects={effects} onEffectChange={setEffects} />
          </FadeInCard>

          <FadeInCard className="liquid-glass rounded-2xl p-5" delay={0.5}>
            <BadgeExport
              image={image}
              material={material}
              shape={shape}
              effects={effects}
              shapeData={shapeData}
              materialData={materialData}
            />
          </FadeInCard>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 min-w-0">
          <FadeInCard className="h-full liquid-glass rounded-2xl p-5 overflow-hidden" delay={0.2}>
            <BadgePreview
              image={image}
              material={material}
              shape={shape}
              effects={effects}
            />
          </FadeInCard>
        </div>
      </div>
    </div>
  );
}
