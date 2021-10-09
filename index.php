<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" 
    rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" 
    crossorigin="anonymous">
    <title>311 Service Request Tracker</title>
</head>
<body>
    <div class="container py-4">
        <div class="row">
            <h1 class="text-center fw-bold">311 Service Request Tracker</h1>
            <p class="text-center text-muted">Filter 311 requests using the form below.</p>
        </div>

        <div class="bg-light border border-2 rounded">
            <form class="row gy-2 p-3" id="search-form">
                <div class="col-6">
                    <label for="date">Report Date</label>
                    <input class="form-control" id="date" name="date" type="date">
                </div>
                <div class="col-6">
                    <label for="service-area">Service Area</label>
                    <input class="form-control" id="service-area" name="service-area" placeholder="Service Area">
                </div>
                <div class="col-6">
                    <label for="service-request">Service Request</label>
                    <input class="form-control" id="service-request" name="service-request" placeholder="Service Request">
                </div>
                <div class="col-6">
                    <label for="ward">Ward</label>
                    <input class="form-control" id="ward" name="ward" placeholder="Ward">
                </div>
                <div class="col-12">
                    <label for="neighbourhood">Neighbourhood</label>
                    <input class="form-control" id="neighbourhood" name="neighbourhood" placeholder="Neighbourhood">
                </div>
                <div class="col-6">
                    <button class="btn btn-dark" id="submit" type="submit">Search</button>
                </div>
            </form>
        </div>

        <div style="display: none;" id="result-table" class="row-12 mt-4 bg-light border border-2 rounded">
            <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Service Area</th>
                            <th scope="col">Service Request</th>
                            <th scope="col">Ward</th>
                            <th scope="col">Neighbourhood</th>
                        </tr>
                    </thead>

                    <tbody id="result-body" class="accordion">
                        
                    </tbody>
            </table>
        </div>

        <div style="display: none;" id="no-result" class="row-12 mt-4 alert alert-danger" role="alert">
            No records found have been found. Please try again with different entries!
        </div>
    </div>

    <script src="main.js"></script>
</body>
</html>