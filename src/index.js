// flux-api-api · Express HTTP wrapper around flux-api-sdk · MIT · AI-Native Solutions
import express from 'express';

const app = express();
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => res.json({ ok: true, tool: 'flux-api', version: '1.0.0' }));

app.post('/addLine', async (req, res) => {
  try {
    const { addLine } = await import('@ai-native-solutions/flux-api-sdk');
    const out = typeof addLine === 'function' ? await addLine(req.body) : { error: 'addLine not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/tryGen', async (req, res) => {
  try {
    const { tryGen } = await import('@ai-native-solutions/flux-api-sdk');
    const out = typeof tryGen === 'function' ? await tryGen(req.body) : { error: 'tryGen not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('flux-api-api listening on :' + PORT));
