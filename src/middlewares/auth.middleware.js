export const publicAcces = (req, res, next) => {
  if (req.session.user) {
    next()
} else {
    res.redirect('/')
}
};

export const privateAcces = (req, res, next) => {
  if (!req.session.user) return res.redirect('/');
  next();
};
