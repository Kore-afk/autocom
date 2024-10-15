import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Mail, Lock, Phone, Calendar, Check, Facebook, Instagram, Apple, Eye, EyeOff } from 'lucide-react';

// se define la interfaz LoginProps que define las propiedades que el componente recibe
interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

// componente funcional de Login
const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true); // estado para alternar entre login y registro
  const [email, setEmail] = useState(''); // estado para el campo de email
  const [password, setPassword] = useState(''); // estado para el campo de contraseña
  const [name, setName] = useState(''); // estado para el campo de nombre (solo en registro)
  const [phone, setPhone] = useState(''); // estado para el campo de teléfono (opcional)
  const [birthDate, setBirthDate] = useState(''); // estado para el campo de fecha de nacimiento (solo en registro)
  const [acceptTerms, setAcceptTerms] = useState(false); // estado para verificar si el usuario acepta los términos (solo en registro)
  const [rememberMe, setRememberMe] = useState(false); // estado para "mantener sesión abierta"
  const [showPassword, setShowPassword] = useState(false); // estado para mostrar/ocultar la contraseña
  const navigate = useNavigate(); // hook para redirigir a otras páginas

  // función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // previene el comportamiento por defecto de recargar la página
    setIsLoggedIn(true); // marca al usuario como autenticado
    navigate('/'); // redirige a la página principal después del login/registro
  };

  // función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // alterna entre mostrar/ocultar contraseña
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Car className="mx-auto h-12 w-auto text-indigo-600" /> {/* icono central de un coche */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Inicia sesión en tu cuenta' : 'Crea tu cuenta'}
          </h2>
        </div>

{/*-------------------inicio formulario de login o registro-----------------------------------------------------------------------------------------------------------*/}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
{/*------------------inicio campo de nombre solo visible en la vista de registro------------------------------------------------------------------------------*/}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Nombre completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
{/*------------------fin campo de nombre solo visible en la vista de registro---------------------------------------------------------------------------------*/}
{/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-------------------campo de correo electrónico----------------------------------------------------------------------------------------------------------*/}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${isLogin ? 'rounded-t-md' : ''} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
{/*---------------------campo de correo electrónico----------------------------------------------------------------------------------------*/}
{/*-------------------------------------------------------------------------------------------------------------------------------------------------*/}
{/*---------------------Campo de contraseña-----------------------------------------------------------------------------------------------------------------------------*/}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
{/*--------------boton para alternar visibilidad de contraseña---------------------------------------------------------------------------------------------------------------------*/}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>

{/*--------------inicio campos adicionales solo para registro--------------------------------------------------------------------------------------------------------------*/}
            {!isLogin && (
              <>
{/*--------------campo opcional para teléfono---------------------------------------------------------------------------------------------------------------*/}
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Número de teléfono (opcional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Número de teléfono (opcional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
{/*--------------fin campo opcional para el telefono---------------------------------------------------------------------------------------------------------------------*/}
{/*--------------------------------------------------------------------------------------------------------------------------------------*/}
{/*--------------campo para fecha de nacimiento-------------------------------------------------------------------------------------------------------------*/}
                <div>
                  <label htmlFor="birthdate" className="sr-only">
                    Fecha de nacimiento
                  </label>
                  <input
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
{/*---------------fin campo para fecha de nacimiento--------------------------------------------------------------------------------------------------------------------*/}
{/*---------------fin inicio de campos adicionales solo para registro-------------------------------------------------------------------------------------------------*/}
{/*--------------------------------------------------------------------------------------------------------------------------------------------------*/}
{/*---------------mantener sesion abierta---------------------------------------------------------------------------------------------------------------------*/}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Mantener sesión abierta
              </label>
            </div>
{/*--------------fin mantener sesion abierta------------------------------------------------------------------------------------------------------------------------*/}
{/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/}
{/*--------------Enlace para recuperar contraseña (solo en login)----------------------------------------------------------------------------------------*/}
            {isLogin && (
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}
          </div>
{/*--------------fin enlace para recuperar contraseña(solo en login)------------------------------------------------------------------------------------------------------------------------*/}
{/*----------------------------------------------------------------------------------------------------------------------------------------------------*/}
{/*--------------------aceptar terminos (solo en registro)-----------------------------------------------------------------------------------------------*/}
          {!isLogin && (
            <div className="flex items-center">
              <input
                id="accept-terms"
                name="accept-terms"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-900">
                Acepto los términos y condiciones
              </label>
            </div>
          )}
{/*-------------------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------boton de enviar-----------------------------------------------------------------------------------------------------*/}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>
          </div>
{/*------------------------fin boton de enviar-------------------------------------------------------------------------------------------------------*/}
{/*-------------------------------------------------------------------------------------------------------------------------------------------*/}
        </form>
{/*-------------------------------------------------------------------------------------------------------------------------------------------*/}
{/*--------------------link para alternar entre login y registro------------------------------------------------------------------------------------*/}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
            </button>
          </p>
        </div>
{/*------------------fin link para alternar entre login y registro----------------------------------------------------------------------------------*/}
{/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-------------------fin formulario de login o registro-----------------------------------------------------------------------------------------------------------*/}
{/* ----------------------------------------------------------------------------------------------------------------------------------- */}
{/*-------------------lotones para iniciar sesión con redes sociales----------------------------------------------------------------------------------*/}
        <div className="mt-6 grid grid-cols-4 gap-3">
          <div>
{/* ----------------------------------inicio_btn_google----------------------------------------------------------------------------------*/}
          <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Inicia sesión con Google</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {/* SVG de Google */}
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
            </button>
{/* ----------------------------------fin_btn_google----------------------------------------------------------------------------------------*/}
          </div>
          <div>
{/* ----------------------------------inicio_btn_fb----------------------------------------------------------------------------------------*/}
          <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Inicia sesión con Facebook</span>
              <Facebook className="h-5 w-5" />
            </button>
{/* ----------------------------------fin_btn_fb-----------------------------------------------------------------------------------------------*/}
          </div>
          <div>
{/* ----------------------------------inicio_btn_apple-------------------------------------------------------------------------------------*/}
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Inicia sesión con Apple</span>
              <Apple className="h-5 w-5" />
            </button>
{/* -----------------------------------fin_btn_apple----------------------------------------------------------------------------------------*/}
          </div>
          <div>
{/* -----------------------------------inicio_btn_ig-------------------------------------------------------------------------------------------*/}
          <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Inicia sesión con Instagram</span>
              <Instagram className="h-5 w-5" />
            </button>
{/* -----------------------------------fin_btn_ig-----------------------------------------------------------------------------------------------*/}
          </div>
        </div>
{/*------------------------------------fin botones iniciar sesion con redes sociales-----------------------------------------------------------------------*/}        
      </div>
    </div>
  );
};

export default Login;
