---
layout: api-explorer
category: api-explorer
---

<div id="api-explorer">
    <!--hints-->
    <button id="cd-tour-trigger" class="btn feedback-btn scale-on-hover">Show hints</button>
	<div class="cd-cover-layer"></div>
    <!--bootstrap error popup-->
    <div id="error-alert" class="modal fade" role="dialog">
        <div class="vertical-alignment-helper">
            <div class="modal-dialog vertical-align-center">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
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
                <h1>THE API EXPLORER</h1>
				<p>Make live API calls without writing a single line of code! The API Explorer currently works with the <a href="/products-and-docs/apis/discovery/v2">Discovery API</a>, <a href="/products-and-docs/apis/commerce/">Commerce API</a> and <a href="/products-and-docs/apis/publish/">Publish API</a> <strong>only</strong>.</p>
            </div>
        </div>
    </div>
    <!--navigation bar-->
    <div class="row">
        <div class="row-container" style="position: relative;">
            <ul class="cd-tour-wrapper">
        		<li class="cd-single-step" style="left: 65%; top: 46%;">
        			<span>Navigation Menu</span>

        			<div class="cd-more-info bottom">
        				<h2>Navigation Menu</h2>
        				<p class="caption">Select API and method to explore</p>
        				<img src="/assets/img/api-explorer/step-1.png">
        			</div>
        		</li> <!-- .cd-single-step -->
            </ul>
            <div class="col-xs-12">
                <nav class="nav navbar-nav"></nav>
            </div>
        </div>
    </div>
    
    <!--event counter bar-->
    {% assign initialValue = site.data.variables.summaryWidget %}
    <div class="row">
        <div class="row-container">
            <section class="">
                <div class="horizontal-events-tracker">
                    <div class="row">
                        <div class="col-xs-12 horizontal-events-tracker__section">
                            <span class="horizontal-events-tracker__title">
                                Number of Events: 
                                <span id="js-events-counter" class="horizontal-events-tracker__counter">{{initialValue.events}}</span>
                            </span>
                            <span class="horizontal-events-tracker__title">
                                Number of Attractions: 
                                <span id="js-attractions-counter" class="horizontal-events-tracker__counter">{{initialValue.attractions}}</span>
                            </span>
                            <span class="horizontal-events-tracker__title">
                                Number of Venues: 
                                <span id="js-venues-counter" class="horizontal-events-tracker__counter">{{initialValue.venues}}</span>
                            </span>
                            <span class="horizontal-events-tracker__title">
                                Number of Countries: 
                                <span id="js-countries-counter" class="horizontal-events-tracker__counter">{{initialValue.countries}}</span>
                        </span>
                        </div>
                    </div>
                </div>
            </section>
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
        <div class="row-container" style="position: relative;">
            <ul class="cd-tour-wrapper">
                <li class="cd-single-step" style="left: 35%; top: 29%;">
                    <span>Api Key</span>

                    <div class="cd-more-info bottom">
                        <h2>Api Key</h2>
                        <p class="caption">Enter your API Key</p>
                        <img src="/assets/img/api-explorer/step-2.png">
                    </div>
                </li> <!-- .cd-single-step -->
            </ul>
            <div class="col-sm-3 col-xs-12">
                <a class="button button-blue" style="width: 100%; text-align: center; margin-top:auto;" href="#" role="button" id="primary-btn">GET</a>
            </div>
            <div class="col-sm-9 col-xs-12">
                <div id="js_custom_select_key">
                    <input type="text" id="api-key" class="form-control" placeholder="Api key" style="width: 100%;" contenteditable="true">
                </div>
            </div>
        </div>
    </div>
    <!--parameters header-->
    <div class="row group-start">
        <div class="row-container">
            <div class="col-xs-12">
                <a href="#" id="parameters-btn"></a>
                <h3 style="float: left;">Parameters</h3>
                <a href="#" class="btn-default btn-small api-exp-param-button" id="copy-request">Copy</a>
                <a href="#" class="btn-default btn-small api-exp-param-button" id="clear-params">Clear</a>
            </div>
        </div>
    </div>
    <!--parameter fields-->
    <div class="row" style="position: relative;">
        <ul class="cd-tour-wrapper">
            <li class="cd-single-step" style="left: 60%; top: 4%;">
                <span>Request Parameters</span>

                <div class="cd-more-info bottom">
                    <h2>Request Parameters</h2>
                    <p class="caption">Fill in query parameters</p>
                    <img src="/assets/img/api-explorer/step-3.png">
                </div>
            </li> <!-- .cd-single-step -->
        </ul>
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
        <div class="row-container" style="position: relative;">
            <ul class="cd-tour-wrapper">
                <li class="cd-single-step" style="right: 20%; top: 12%;">
                    <span>Request Log</span>

                    <div class="cd-more-info top">
                        <h2>Request Log</h2>
                        <p class="caption">View your requests log with raw URL and response</p>
                        <img src="/assets/img/api-explorer/step-4.png">
                    </div>
                </li> <!-- .cd-single-step -->
            </ul>
            <div class="col-xs-12">
                <div class="panel-group" id="req-res-container"></div>
            </div>
        </div>
    </div>
    <!--slider-->
    <div class="row-container" style="position: relative;">
        <ul class="cd-tour-wrapper">
            <li class="cd-single-step" style="left: 17%; top: 98px;">
                <span>Response Items</span>

                <div class="cd-more-info top">
                    <h2>Response Items</h2>
                    <p class="caption">Explore the response :)</p>
                    <img src="/assets/img/api-explorer/step-5.png">
                </div>
            </li> <!-- .cd-single-step -->
        </ul>
        <div id="columns"></div>
    </div>
</div>
