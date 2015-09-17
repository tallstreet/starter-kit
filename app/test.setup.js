require('babel/register')({
  stage: 0,
  plugins: ['typecheck']
});

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = process.env.NODE_ENV !== 'production';
delete global.__BROWSER__;

if (__DEV__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}
