import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'


import JavaScriptObfuscator from 'javascript-obfuscator';

const textArea = document.getElementById('code') as HTMLTextAreaElement;

const copyButton = document.getElementById('copy') as HTMLButtonElement;
const output = document.getElementById('obfuscated') as HTMLTextAreaElement;

copyButton.addEventListener('click', () => {
  console.log('Current code:', output.value)
  copy(output.value);
});

let code = textArea.value as string;

textArea.addEventListener('input', () => {
  code = textArea.value;
} );



function obfuscate(code: string) {
  try {
  output.innerHTML = JavaScriptObfuscator.obfuscate(code, {
    compact: true, 
    controlFlowFlattening: true
    }).getObfuscatedCode();
  }
  catch (error) {
    console.log(error);
  }
}

function copy(code: string) {
  navigator.clipboard.writeText(code)
    .then(() => {
      console.log('Code copied to clipboard');
    })
    .catch((error) => {
      console.log('Failed to copy code to clipboard:', error);
    });
}

// function Clear
document.getElementById('clear')?.addEventListener('click', () => {
  console.log('Clearing code');
  textArea.value = '';
  output.value = '';
});

document.getElementById('obfuscate')?.addEventListener('click', () => {
  obfuscate(code)
});
