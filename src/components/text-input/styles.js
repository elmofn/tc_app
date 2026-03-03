import { StyleSheet } from 'react-native'
import { colors } from '../../styles'

export const styles = StyleSheet.create({
	// SEU ESTILO ORIGINAL, MANTIDO
	label: {
		fontSize: 16,
		marginBottom: 4,
		color: colors.textBlack,
	},
	
	// SEU ESTILO 'input' FOI RENOMEADO E ADAPTADO
	inputContainer: {
		height: 48,
		borderWidth: 1,
		borderColor: '#707A81',
		borderRadius: 24,
		//backgroundColor: '#FFF', // Descomente se precisar de fundo
		
		// ADIÇÕES PARA O ACESSÓRIO FUNCIONAR:
		flexDirection: 'row', // Para alinhar DDI e texto
		alignItems: 'center', // Centraliza verticalmente
		// Removemos o padding daqui para o 'textInput' controlar
	},

	// NOVO ESTILO PARA O CAMPO DE TEXTO INTERNO
	textInput: {
		flex: 1, // Ocupa todo o espaço restante
		height: '100%',
		paddingHorizontal: 10, // O seu 'padding: 10' original, aplicado aqui
		fontSize: 16, // Um bom padrão
		color: colors.textBlack,
	}
})