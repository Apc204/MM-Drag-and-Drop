<?php include_once('includes/header.php'); ?>
		
<div class="page email-editor">

	<div class="preview-area" id="preview-area">
		<div class="email-preview" id="email-preview">

			<center class="wrapper">
		        <div class="webkit">
		            <!--[if (gte mso 9)|(IE)]>
		            <table width="600" align="center">
		            <tr>
		            <td>
		            <![endif]-->
		            <table class="outer" id="outer" align="center">
		            	<tr class="column-component">
		                    <td class="one-column">
		                        <table width="100%">
		                            <tr>
		                                <td class="inner contents">
		                                    <div id="beginning-placeholder">
		                                    	Drag column layouts here to begin
		                                    </div>
		                                </td>
		                            </tr>
		                        </table>
		                    </td>
		                </tr>
		            </table>
		            <!--[if (gte mso 9)|(IE)]>
		            </td>
		            </tr>
		            </table>
		            <![endif]-->
		        </div>
		    </center>

		</div>
	</div>

	<?php include_once('includes/sidebar.php'); ?>
	
</div>

<?php include_once('includes/footer.php'); ?>