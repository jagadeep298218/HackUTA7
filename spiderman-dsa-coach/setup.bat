@echo off
echo 🕸️ Setting up Spider-Man DSA Coach...

echo.
echo Installing backend dependencies...
cd backend
pip install -r requirements.txt

echo.
echo Installing frontend dependencies...
cd ..\frontend
npm install

echo.
echo ✅ Setup complete! 
echo.
echo To start the application:
echo 1. Run start-backend.bat (in a separate terminal)
echo 2. Run start-frontend.bat (in another terminal)
echo.
echo Don't forget to set your OPENAI_API_KEY in backend/.env file!
pause
