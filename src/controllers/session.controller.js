export const registerController = async (req, res) => {
  res.redirect('/login');
};

export const loginController = async (req, res) => {
  if (!req.user) {
    return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
  }
  if (req.user.rol == 'Admin') {
    req.session.user = {
      name: req.user.name,
      email: req.user.email,
      age: 0,
      rol: req.user.rol,
    };
  } else {
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      rol: 'User',
    };
  }
  console.log(req.user);
  res.redirect('/products');
};

export const githubController = async (req, res) => {
  req.session.user = req.user;
  res.redirect('/products');
};

export const loguotController = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send({ status: 'error', error: 'No pudo cerrar sesion' });
    res.redirect('/');
  });
};
