$(document).ready(function(){
	// Prevent ajax html caching
	$.ajaxSetup({ cache: false });

	// Tabs for sidebar
	$('.tab').click(function(){
		$('.tab').removeClass('active');
		$(this).addClass('active');
		var contentSelector = '#'+$(this).attr('id')+'-div';
		$('.tab-content').hide();
		$(contentSelector).show();
	});


	/*********************************************
	**** COLUMN WIDGETS **************************
	*********************************************/
	// Column start and end
	var comps = document.querySelectorAll('.column-widget');
	[].forEach.call(comps, function(comp) {
		comp.addEventListener('dragstart', columnDragStart, false);
		comp.addEventListener('dragend', columnDragEnd, false);
	});
	function columnDragStart(e){
		this.style.opacity = '0.4';
		dragSrcEl = this;
	}
	function columnDragEnd(e){
		this.style.opacity = '1';
		$('.temp-row').remove();
	}
	// Drag one column
	var onecolumn = document.getElementById('onecolumn-widget');
	onecolumn.addEventListener('dragstart', onecolumnDragStart, false);
	function onecolumnDragStart(e){
		dragSrcEl = this;
		dragType = 'column';
		$.get("email-components/one-column.html", function( my_var ) {
		   dragContent = my_var;
		}, 'html');
	}
	// Drag two column
	var twocolumn = document.getElementById('twocolumn-widget');
	twocolumn.addEventListener('dragstart', twocolumnDragStart, false);
	function twocolumnDragStart(e){
		dragSrcEl = this;
		dragType = 'column';
		$.get("email-components/two-column.html", function( my_var ) {
		   dragContent = my_var;
		   console.log(dragContent);
		}, 'html');
	}
	// Drag three column
	var twocolumn = document.getElementById('threecolumn-widget');
	twocolumn.addEventListener('dragstart', threecolumnDragStart, false);
	function threecolumnDragStart(e){
		dragSrcEl = this;
		dragType = 'column';
		$.get("email-components/three-column.html", function( my_var ) {
		   dragContent = my_var;
		   console.log(dragContent);
		}, 'html');
	}
	

	/*********************************************
	**** INITIAL PLACEHOLDER *********************
	*********************************************/
	var previewArea = document.getElementById("beginning-placeholder");
	previewArea.addEventListener('dragenter', placeholderDragEnter, false);
	previewArea.addEventListener('dragleave', placeholderDragLeave, false);
	previewArea.addEventListener('dragover', placeholderDragOver, false);
	previewArea.addEventListener('drop', placeholderDrop, false);

	function placeholderDragEnter(e){
		if(dragType == 'column'){
			$(this).addClass('hovering');
		}
	}
	function placeholderDragLeave(e){
		if(dragType == 'column'){
			$(this).removeClass('hovering');
		}
	}

	function placeholderDragOver(e){
		if (e.preventDefault) {
			e.preventDefault();
		}
		if(dragType == 'column'){
			e.dataTransfer.dropEffect = 'move';
		}
	}
	function placeholderDrop(e){
		if (e.stopPropagation) {
		    e.stopPropagation();
		}
		if(dragType == 'column'){
			// Select the tr before the placeholder and add the new column before it
			$(this).closest('.column-component').before(dragContent);
			// Remove the parent tr
			$(this).closest('.column-component').remove();
			bindRows();
			bindContentPlaceholders();
		}
	}

	/*********************************************
	**** EMAIL ROWS ******************************
	*********************************************/
	function bindRows(){
		// Email row
		var rows = document.querySelectorAll('.email-row');
		[].forEach.call(rows, function(row) {
			//comp.addEventListener('dragstart', componentDragStart, false);
			row.addEventListener('dragover', rowDragOver, false);
			row.addEventListener('drop', rowDrop, false);
		});
	}
		
	function rowDragOver(e){
		if (e.preventDefault) {
			e.preventDefault();
		}
		if(dragType == 'column'){
			e.dataTransfer.dropEffect = 'move';
			// Check where mouse is
			var parentOffset = $(this).offset();
			var midpoint = $(this).height()/2;
			var relX = e.pageX - parentOffset.left;
			var relY = e.pageY - parentOffset.top;
			var tempRowIndex = $('.temp-row').index()
			var thisIndex = $(this).index();
			//console.log('x: '+relX+' y: '+relY);
			if(relY > midpoint){
				console.log('lower half');
				// If temp row is not already directly after, remove it and put it after
				if(tempRowIndex != thisIndex+1 || tempRowIndex == -1){
					console.log('removing');
					$('.temp-row').remove();
					$(this).after('<tr class="temp-row"><td class="one-column"><div>Drop to add columns here</div></td></tr>');
					bindTempRow();
				}
			}
			else {
				console.log('upper half. tmprow: '+tempRowIndex+' this: '+thisIndex);
				// If temp row is not already directly before, remove it and put it before
				if(tempRowIndex != thisIndex-1 || tempRowIndex == -1){
					console.log('removing');
					$('.temp-row').remove();
					$(this).before('<tr class="temp-row"><td class="one-column"><div>Drop to add columns here</div></td></tr>');
					bindTempRow();
				}
			}
		}
	}

	function rowDrop(e){
		var tempRow = $('.temp-row');
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.dataTransfer.dropEffect = 'move';
		tempRow.before(dragContent);
		tempRow.remove();
		bindRows();
		bindContentPlaceholders();
	}

	function bindTempRow(){
		var temprows = document.querySelectorAll('.temp-row');
		[].forEach.call(temprows, function(temprow) {
			//comp.addEventListener('dragstart', componentDragStart, false);
			temprow.addEventListener('dragover', tempRowDragOver, false);
			temprow.addEventListener('drop', rowDrop, false);
		});
	}

	function tempRowDragOver(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.dataTransfer.dropEffect = 'move';
	}


	/*********************************************
	**** CONTENT BLOCKS **************************
	*********************************************/
	var conts = document.querySelectorAll('.content-widget');
	[].forEach.call(conts, function(cont) {
		cont.addEventListener('dragstart', contentDragStart, false);
		cont.addEventListener('dragend', contentDragEnd, false);
	});
	function contentDragStart(e){
		this.style.opacity = '0.4';
		dragSrcEl = this;
	}
	function contentDragEnd(e){
		this.style.opacity = '1';
		$('.temp-row').remove();
	}

	// Drag text widget
	var onecolumn = document.getElementById('text-widget');
	onecolumn.addEventListener('dragstart', textDragStart, false);
	function textDragStart(e){
		dragSrcEl = this;
		dragType = 'content';
	   	dragContent = '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>';
	}
	// Drag image widget
	var onecolumn = document.getElementById('image-widget');
	onecolumn.addEventListener('dragstart', imageDragStart, false);
	function imageDragStart(e){
		dragSrcEl = this;
		dragType = 'content';
	   	dragContent = '<img src="images/WVPdl44.jpg" />';
	}
	// Content placeholder
	function bindContentPlaceholders(){
		var contphs = document.querySelectorAll('.content-placeholder');
		[].forEach.call(contphs, function(contph) {
			contph.addEventListener('dragover', contentPlaceholderDragOver, false);
			contph.addEventListener('dragenter', contentPlaceholderDragEnter, false);
			contph.addEventListener('dragleave', contentPlaceholderDragLeave, false);
			contph.addEventListener('drop', contentPlaceholderDrop, false);
		});
	}
	function contentPlaceholderDragOver(e){
		if (e.preventDefault) {
			e.preventDefault();
		}
		if(dragType == 'content'){
			e.dataTransfer.dropEffect = 'move';
		}
	}
	function contentPlaceholderDragEnter(e){
		if(dragType == 'content'){
			$(this).addClass('hovering');
		}
	}
	function contentPlaceholderDragLeave(e){
		if(dragType == 'content'){
			$(this).removeClass('hovering');
		}
	}
	function contentPlaceholderDrop(e){
		if(dragType == 'content'){
			$(this).before(dragContent);
			$(this).remove();
		}
	}

})