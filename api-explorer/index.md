---
layout: api-explorer
---

<div id="api-explorer">
    <!--hints-->
    <button id="cd-tour-trigger" class="btn feedback-btn">Show hints</button>
	<ul class="cd-tour-wrapper">
		<li class="cd-single-step">
			<span>Step 1</span>

			<div class="cd-more-info bottom">
				<h2>Step Number 1</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi alias animi molestias in, aperiam.</p>
			</div>
		</li> <!-- .cd-single-step -->
		<li class="cd-single-step">
			<span>Step 2</span>

			<div class="cd-more-info top">
				<h2>Step Number 2</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia quasi in quisquam.</p>
			</div>
		</li> <!-- .cd-single-step -->
		<li class="cd-single-step">
			<span>Step 3</span>

			<div class="cd-more-info top">
				<h2>Step Number 3</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio illo non enim ut necessitatibus perspiciatis, dignissimos.</p>
			</div>
		</li> <!-- .cd-single-step -->
        <li class="cd-single-step">
            <span>Step 4</span>

            <div class="cd-more-info top">
                <h2>Step Number 4</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio illo non enim ut necessitatibus perspiciatis, dignissimos.</p>
            </div>
        </li> <!-- .cd-single-step -->
	</ul> <!-- .cd-tour-wrapper -->
	<div class="cd-cover-layer"></div>
    <!--bootstrap error popup-->
    <div id="error-alert" class="modal fade" role="dialog">
        <div class="vertical-alignment-helper">
            <div class="modal-dialog vertical-align-center">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="error-message">Whoa! Method returned an error. :(</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-default btn-small" data-dismiss="modal" style="top: 0 !important;">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--bootstrap success popup-->
    <div id="success-alert" class="modal fade" role="dialog">
        <div class="vertical-alignment-helper">
            <div class="modal-dialog vertical-align-center">
                <!-- Modal content-->
                <div class="modal-content success">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="success-message">Data posted successfully :)</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-default btn-small" data-dismiss="modal" style="top: 0 !important;">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--bootstrap image popup-->
    <div class="modal fade" id="image-popup" role="dialog">
        <div class="vertical-alignment-helper">
            <div class="modal-dialog modal-lg vertical-align-center">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Image preview</h4>
                    </div>
                    <div class="modal-body">
                        <img id="image-element" src="">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" style="top: 0 !important;">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--bootstrap map popup-->
    <div class="modal fade" id="map-popup" role="dialog">
        <div class="vertical-alignment-helper">
            <div class="modal-dialog modal-lg vertical-align-center">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Location</h4>
                    </div>
                    <div class="modal-body" id="map" style="width: 100%; height: 500px;"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" style="top: 0 !important;">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--page header-->
    <div class="row">
        <div class="row-container">
            <div class="col-xs-12">
                <h1>TICKETMASTER API EXPLORER</h1>
            </div>
        </div>
    </div>
    <!--navigation bar-->
    <div class="row">
        <div class="row-container">
            <div class="col-xs-12">
                <nav class="nav navbar-nav"></nav>
            </div>
        </div>
    </div>
    <!--selected method-->
    <div class="row">
        <div class="row-container" id="title">
            <h2 class="col-xs-12" id="selected-method-name"></h2>
            <a href="#" id="doc-link" style="display: none;" target="_blank"></a>
            <div class="clearfix"></div>
        </div>
    </div>
    <!--get button + api key-->
    <div class="row group-start">
        <div class="row-container">
            <div class="col-sm-3 col-xs-12">
                <a class="button button-blue" style="width: 100%; text-align: center; margin-top:auto;" href="#" role="button" id="primary-btn">GET</a>
            </div>
            <div class="col-sm-9 col-xs-12">
                <input type="text" id="api-key" class="form-control" placeholder="Api key" style="width: 100%;">
            </div>
        </div>
    </div>
    <!--parameters header-->
    <div class="row group-start">
        <div class="row-container">
            <div class="col-xs-12">
                <a href="#" id="parameters-btn"></a>
                <h3 style="float: left;">Parameters</h3>
                <a href="#" class="btn-default btn-small" id="clear-params">Clear parameters</a>
            </div>
        </div>
    </div>
    <!--parameter fields-->
    <div class="row">
        <div class="row-container" id="primary-column"></div>
        <div class="row-container">
            <div class="col-xs-12">
               <div class="separator"></div>
            </div>
        </div>
    </div>
    <!--json post-->
    <div id="post-json" style="display: none;">
        <!--json post header-->
        <div class="row group-start">
            <div class="row-container">
                <div class="col-xs-12">
                    <a href="#" id="json-btn"></a>
                    <h3 style="float: left;">Post JSON</h3>
                    <a href="#" class="btn-default btn-small" id="reformat-json">Reformat JSON Structure</a>
                    <a href="#" class="btn-default btn-small" id="clear-json">Clear JSON</a>
                </div>
            </div>
        </div>
        <!--json post textarea-->
        <div class="row" id="post-json-container" style="display: none;">
            <div class="row-container">
                <div class="col-xs-12">
                    <textarea id="post-json-area" style="width: 100%; height: 300px; resize: vertical; padding: 15px;"></textarea>
                </div>
            </div>
        </div>
        <div class="row-container">
            <div class="col-xs-12">
                <div class="separator"></div>
            </div>
        </div>
    </div>
    <!--response list header-->
    <div class="row">
        <div class="row-container">
            <div class="col-xs-12">
                <h3 style="float: left;">Requests list</h3>
                <a href="#" class="btn-default btn-small" id="clear-req-resp">Clear all requests</a>
            </div>
        </div>
    </div>
    <!--response list-->
    <div class="row">
        <div class="row-container">
            <div class="col-xs-12">
                <div class="panel-group" id="req-res-container"></div>
            </div>
        </div>
    </div>
    <!--slider-->
    <div class="row-container">
        <div id="columns"></div>
    </div>
</div>
