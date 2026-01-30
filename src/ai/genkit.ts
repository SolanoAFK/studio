import {configureGenkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {genkit} from 'genkit';

// This is a workaround for the fact that the old configureGenkit does not
// export an ai object. We will create a dummy ai object that is compatible
// with the new API.
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
