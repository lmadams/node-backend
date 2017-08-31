import app from './app';

app.listen(app.get('port'), () => {
  console.log(`app is runing on port ${app.get('port')}`);
});
