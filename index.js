/*
   _____       __
  / ___/____  / /___ ______
  \__ \/ __ \/ / __ `/ ___/
 ___/ / /_/ / / /_/ / /
/____/\____/_/\__,_/_/
    ___          _                 __  _
   /   |  ____  (_)___ ___  ____ _/ /_(_)___  ____  _____
  / /| | / __ \/ / __ `__ \/ __ `/ __/ / __ \/ __ \/ ___/
 / ___ |/ / / / / / / / / / /_/ / /_/ / /_/ / / / (__  )
/_/  |_/_/ /_/_/_/ /_/ /_/\__,_/\__/_/\____/_/ /_/____/

Version: 0.0.1
Author: Dan G
*/

// TODO: Make a system that allows to pass attribute settings (such as solar-delay) and then act accordingly. Make it easy to add more settings.

const optionsDefault = {
  delay: '0s',
  offset: '40',
  duration: '1s',
};

let options = Object.keys(optionsDefault);

export default function SolarAnimations() {
  const solarElements = document.querySelectorAll('[data-solar]');

  const observerConfig = {
    threshold: 0.25,
    rootMargin: "100px 100px 100px 100px"
  };

  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if ('reset' in entry.target.dataset){
          entry.target.classList.remove('solar-reset');
          void entry.target.offsetWidth;
        }
        
        else {
          observer.unobserve(entry.target);
        }
        entry.target.classList.add('solar-animated');
      } 
      
      else if ('reset' in entry.target.dataset) {
        if (entry.boundingClientRect.y > 0) {
          entry.target.classList.remove('solar-animated');
          void entry.target.offsetWidth;
          entry.target.classList.add('solar-reset');
        }
      }
      else {}
    });
  }, observerConfig);

  solarElements.forEach(element => {
    let optionsMod = {...optionsDefault};

    options.forEach((key, index) => {
      let attributeVal = element.getAttribute(`data-solar-${key}`);

      if (attributeVal) {
        optionsMod[key] = attributeVal;
      }
    });

    element.style.animationDelay = optionsMod.delay;
    element.style.animationDuration = optionsMod.duration;

    observer.observe(element);
  });
}
