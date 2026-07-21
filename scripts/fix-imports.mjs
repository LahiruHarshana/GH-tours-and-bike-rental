import fs from 'fs';
import path from 'path';

const replacements = [
  { old: '@/components/ui/CinematicHeading', new: '@/components/public/typography/CinematicHeading' },
  { old: '@/components/ui/SectionHeading', new: '@/components/public/typography/SectionHeading' },
  { old: '@/components/ui/MagneticLink', new: '@/components/public/actions/MagneticLink' },
  { old: '@/components/ui/CinematicFigure', new: '@/components/public/media/CinematicFigure' },
  { old: '@/components/ui/Reveal', new: '@/components/public/motion/Reveal' },
  { old: '@/components/ui/ScrollExperience', new: '@/components/public/motion/ScrollExperience' },
  { old: '@/components/ui/EditorialRail', new: '@/components/public/collections/EditorialRail' },
  { old: '@/components/ui/AnimatedCatalogGrid', new: '@/components/public/collections/AnimatedCatalogGrid' },
  { old: '@/components/ui/BrandMark', new: '@/components/public/media/BrandMark' },
  { old: '@/components/ui/CountUpStats', new: '@/components/public/motion/CountUpStats' },
  { old: '@/components/public/TourCard', new: '@/components/public/cards/TourCard' },
  { old: '@/components/public/BikeCard', new: '@/components/public/cards/BikeCard' },
  { old: '@/components/public/PublicHeader', new: '@/components/public/navigation/PublicHeader' },
  { old: '@/components/public/PublicFooter', new: '@/components/public/navigation/PublicFooter' },
  { old: '@/components/public/IslandMarquee', new: '@/components/public/navigation/IslandMarquee' },
  { old: '@/components/public/JourneyPlannerRibbon', new: '@/components/public/navigation/JourneyPlannerRibbon' }
];

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        results.push(filePath);
      }
    }
  });
  return results;
};

const files = walk(path.join(process.cwd(), 'src'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  for (const {old: o, new: n} of replacements) {
    if (content.includes(o)) {
      content = content.split(o).join(n);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated imports in ${file}`);
  }
}
