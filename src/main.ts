import './style.css'


import JavaScriptObfuscator from 'javascript-obfuscator';

const textArea = document.getElementById('code') as HTMLTextAreaElement;

const copyButton = document.getElementById('copy') as HTMLButtonElement;

// Miniify button

const minifyButton = document.getElementById('minify') as HTMLButtonElement;

// OPutput textarea
const output = document.getElementById('obfuscated') as HTMLTextAreaElement;

let code = textArea.value as string;


function minifyCode(code : string) {
  try{
  // Remove comments
  code = code.replace(/\/\/.*|\/\*[^]*?\*\//g, '');

  // Remove whitespace
  output.innerHTML =  code.replace(/\s+/g, ' ');

  }catch (error) {
    console.log(error);
  }

}

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

copyButton.addEventListener('click', () => {
  console.log('Current code:', output.value)
  copy(output.value);
});


textArea.addEventListener('input', () => {
  code = textArea.value;
} );

minifyButton.addEventListener('click', () => {
  minifyCode(code);
});

// function Clear
document.getElementById('clear')?.addEventListener('click', () => {
  console.log('Clearing code');
  textArea.value = '';
  output.value = '';
});

document.getElementById('obfuscate')?.addEventListener('click', () => {
  obfuscate(code)
});
