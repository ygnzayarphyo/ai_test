/*
 * q2.java
 *
 * Created on May 13, 2019, 9:36:51 PM
 */
package mm.com.zayar.www;

/**
 * @author Zayar Phyo
 */
@SuppressWarnings("serial")
public class RepayDebts extends javax.swing.JFrame {

	// Variables declaration
	private javax.swing.JButton btnCalculate;
	private javax.swing.JPanel inputPane;
	private javax.swing.JSpinner jSpinnerLoan;
	private javax.swing.JSpinner jSpinnerRate;
	private javax.swing.JSpinner jSpinnerRepay;
	private javax.swing.JLabel lblLoan;
	private javax.swing.JLabel lblRate;
	private javax.swing.JLabel lblRepayAmount;
	private javax.swing.JScrollPane outputPane;
	private javax.swing.JTextPane txtOutput;
	// End of variables declaration

	/** Creates new form q2 */
	public RepayDebts() {
		initComponents();
	}

	private void initComponents() {

		inputPane = new javax.swing.JPanel();
		lblLoan = new javax.swing.JLabel();
		lblRate = new javax.swing.JLabel();
		lblRepayAmount = new javax.swing.JLabel();
		jSpinnerLoan = new javax.swing.JSpinner();
		jSpinnerRate = new javax.swing.JSpinner();
		jSpinnerRepay = new javax.swing.JSpinner();
		btnCalculate = new javax.swing.JButton();
		outputPane = new javax.swing.JScrollPane();
		txtOutput = new javax.swing.JTextPane();

		setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
		setTitle(".: Loan calculator :.");
		setBounds(new java.awt.Rectangle(0, 0, 316, 480));
		setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
		setMinimumSize(new java.awt.Dimension(420, 484));
		setName(".: Loan calculator :."); // NOI18N
		setResizable(false);
		getContentPane().setLayout(null);

		inputPane.setBorder(javax.swing.BorderFactory.createTitledBorder(".: Input :."));

		lblLoan.setText("Loan >");

		lblRate.setText("Annual interest rate(%) >");

		lblRepayAmount.setText("Repayment amount >");

		jSpinnerLoan.setModel(new javax.swing.SpinnerNumberModel(Integer.valueOf(100000), Integer.valueOf(100), null,
				Integer.valueOf(100)));
		jSpinnerLoan.setEditor(new javax.swing.JSpinner.NumberEditor(jSpinnerLoan, ""));

		jSpinnerRate.setModel(new javax.swing.SpinnerNumberModel(Float.valueOf(14.0f), Float.valueOf(0.5f),
				Float.valueOf(50.0f), Float.valueOf(0.5f)));

		jSpinnerRepay.setModel(new javax.swing.SpinnerNumberModel(Integer.valueOf(20000), Integer.valueOf(100), null,
				Integer.valueOf(100)));

		javax.swing.GroupLayout inputPaneLayout = new javax.swing.GroupLayout(inputPane);
		inputPane.setLayout(inputPaneLayout);
		inputPaneLayout.setHorizontalGroup(
				inputPaneLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(inputPaneLayout
						.createSequentialGroup().addContainerGap().addGroup(inputPaneLayout
								.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(inputPaneLayout
										.createSequentialGroup()
										.addComponent(lblRepayAmount, javax.swing.GroupLayout.PREFERRED_SIZE, 133,
												javax.swing.GroupLayout.PREFERRED_SIZE)
										.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
										.addComponent(
												jSpinnerRepay, javax.swing.GroupLayout.PREFERRED_SIZE, 141,
												javax.swing.GroupLayout.PREFERRED_SIZE))
								.addGroup(javax.swing.GroupLayout.Alignment.TRAILING,
										inputPaneLayout.createSequentialGroup().addGroup(inputPaneLayout
												.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
												.addGroup(javax.swing.GroupLayout.Alignment.LEADING, inputPaneLayout
														.createSequentialGroup().addComponent(lblRate)
														.addPreferredGap(
																javax.swing.LayoutStyle.ComponentPlacement.RELATED)
														.addComponent(jSpinnerRate,
																javax.swing.GroupLayout.PREFERRED_SIZE, 57,
																javax.swing.GroupLayout.PREFERRED_SIZE))
												.addGroup(inputPaneLayout.createSequentialGroup().addComponent(lblLoan)
														.addPreferredGap(
																javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
														.addComponent(jSpinnerLoan,
																javax.swing.GroupLayout.DEFAULT_SIZE, 170,
																Short.MAX_VALUE)))
												.addGap(64, 64, 64)))
						.addGap(60, 60, 60)));
		inputPaneLayout.setVerticalGroup(inputPaneLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
				.addGroup(inputPaneLayout.createSequentialGroup().addContainerGap()
						.addGroup(inputPaneLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
								.addComponent(lblLoan)
								.addComponent(jSpinnerLoan, javax.swing.GroupLayout.PREFERRED_SIZE,
										javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
						.addGap(18, 18, 18)
						.addGroup(inputPaneLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
								.addComponent(lblRate)
								.addComponent(jSpinnerRate, javax.swing.GroupLayout.PREFERRED_SIZE,
										javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
						.addGap(18, 18, 18)
						.addGroup(inputPaneLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
								.addComponent(lblRepayAmount).addComponent(jSpinnerRepay,
										javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE,
										javax.swing.GroupLayout.PREFERRED_SIZE))
						.addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)));

		getContentPane().add(inputPane);
		inputPane.setBounds(10, 10, 410, 140);

		btnCalculate.setMnemonic('C');
		btnCalculate.setText("Calculate");
		btnCalculate.setAutoscrolls(true);
		btnCalculate.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				btnCalculateActionPerformed(evt);
			}
		});
		getContentPane().add(btnCalculate);
		btnCalculate.setBounds(60, 160, 310, 30);

		outputPane.setBorder(javax.swing.BorderFactory.createTitledBorder(".: Output :."));

		txtOutput.setEditable(false);
		outputPane.setViewportView(txtOutput);

		getContentPane().add(outputPane);
		outputPane.setBounds(10, 200, 410, 240);

		pack();
	}

	private void btnCalculateActionPerformed(java.awt.event.ActionEvent evt) {
		float loan = Float.parseFloat(jSpinnerLoan.getValue().toString());
		float rate = Float.parseFloat(jSpinnerRate.getValue().toString());
		float repayAmount = Float.parseFloat(jSpinnerRepay.getValue().toString());
		int totalRepayAmt = 0, month = 1;
		String output = "";

		rate = rate / 12; // to get 1 month interest rate.
		while (loan != 0) {
			output += month + RomanSeries(month) + " month: ";
			if (loan > repayAmount) {
				loan = (loan + ((loan * rate) / 100)) - repayAmount;
				totalRepayAmt += repayAmount;
				output += "Repayment amount " + ((int) repayAmount) + " Ks remaining " + ((int) loan) + " Ks\n";
			} else {
				repayAmount = (loan + ((loan * rate) / 100));
				loan = 0;
				totalRepayAmt += repayAmount;
				output += "Repayment amount " + ((int) repayAmount) + " Ks pay off. \n";
			}
			month++;
		}
		output += "Total Payment: " + totalRepayAmt + " Ks.";
		txtOutput.setText(output);
	}

	private String RomanSeries(int month) {
		String returnVal = "";
		if (month <= 20) {
			if (month % 20 == 1) {
				returnVal = "st";
			} else if (month % 20 == 2) {
				returnVal = "nd";
			} else if (month % 20 == 3) {
				returnVal = "rd";
			} else {
				returnVal = "th";
			}

		} else {
			if (month % 10 == 1 && month > 20) {
				returnVal = "st";
			} else if (month % 10 == 2 && month > 20) {
				returnVal = "nd";
			} else if (month % 10 == 3 && month > 20) {
				returnVal = "rd";
			} else {
				returnVal = "th";
			}
		}
		return returnVal;
	}

	public static void main(String args[]) {
		java.awt.EventQueue.invokeLater(new Runnable() {

			public void run() {
				new RepayDebts().setVisible(true);
			}
		});
	}
}
