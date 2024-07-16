import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Toaster } from 'sonner';
import NProgressBar from './utils/NProgressBar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Toaster position="top-right" richColors />
			<BrowserRouter>
				<NProgressBar>
					<DndProvider backend={HTML5Backend}>
						<App />
					</DndProvider>
				</NProgressBar>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
