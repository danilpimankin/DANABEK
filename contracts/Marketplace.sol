// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/interfaces/IERC721.sol";

/**
* @title NFT marketplace SC 
* @author Danil Pimankin
*/ 
contract Marketplace{


    /**
    * @notice List of selling items 
    */ 
    mapping(uint256 => Listing) public _listings;


    struct Listing  {
        address owner;
        address tokenAddress;
        uint256 price;
    }

    /**
    * @notice Emitted when a user starts selling an token (ERC721 token)
    * @param _seller An token seller address
    * @param _tokenId An ID of the selling token
    * @param _tokenAddress An ERC20 Token contract address
    * @param _price price of the selling token
    */
    event ListItem(
        address indexed _seller, 
        uint256 indexed _tokenId, 
        address _tokenAddress, 
        uint256 _price
    );
    /** 
    * @notice Emitted when a user buys an token (ERC721 token)
    * @param _buyer A buyer address
    * @param _tokenId An ID of the bought token
    * @param _price A purchase price
    */    event BuyItem(
        address indexed _buyer, 
        uint256 indexed _tokenId, 
        uint256 _price
    );    
    /**
    * @notice Emitted when a user cancels the sale of an token (ERC721 token)
    * @param _seller A token owner address
    * @param _tokenId An ID of the token
    */
    event CancelListing(
        address indexed _seller,
        uint256 indexed _tokenId
    );

    /*
    * @notice Function to sale a token
    * @param _tokenId An ID of the token 
    * @param _price A token price 
    * @param _tokenAddress Payment token contract address 
    * @dev Transfers `tokenId` from seller address to marketplace adddress.
    * Requirements:
    *   
    * - `_tokenId` must exist.
    * - `_tokenAddress` must take one of two values:
    *    1. Address of the contract for payment with tokens. 
    *    2. Zero address for payment in native currency
    *
    * Emits a {ListItem} event.
    */
    function listItem(
        uint256 _tokenId, 
        uint256 _price, 
        address _tokenAddress
    ) external {
        IERC721 nft = IERC721(_tokenAddress);
        require(nft.ownerOf(_tokenId) == msg.sender, "MARKETPLACE: You are not an owner");
        Listing storage listing = _listings[_tokenId];

        nft.safeTransferFrom(msg.sender, address(this), _tokenId);

        listing.owner = msg.sender;
        listing.tokenAddress = _tokenAddress;
        listing.price = _price;

        emit ListItem(msg.sender, _tokenId, _tokenAddress, _price);
    }

    /**
    * @notice Function to buy a token
    * @param _tokenId An ID of the token 
    * @dev If user bought a token transfers `tokenId` from marketplace adddress address to buyer address 
    * and transfers funds to seller address.
    * Requirements:
    *   
    * - `_tokenId` must exist.
    *
    * Emits a {BuyItem} event.
    */
    function buyItem(uint256 _tokenId) external payable {
        Listing storage listing = _listings[_tokenId];
        IERC721 nft = IERC721(listing.tokenAddress);
        require(listing.owner != address(0), 
            "MARKETPLACE: Item is not selling"
        );

        require(msg.value >= listing.price, 
            "MARKETPLACE: You have not sent enough funds"
        );

        (bool success, ) = payable(listing.owner).call{value: listing.price}("");
        require(success);
        
        uint256 refund = msg.value - listing.price;
        if(refund > 0) {
            payable(msg.sender).transfer(refund); 
        }

        nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        
        emit BuyItem(msg.sender, listing.price, _tokenId);

        delete _listings[_tokenId];
    }   

    /**
    * @notice Function to stop item selling
    * @param _tokenId An ID of the token 
    * @dev Transfers `tokenId` from marketplace adddress address to seller address. 
    * Requirements:
    *   
    * - `_tokenId` must exist.
    * - `msg.sender` should be token owner
    *
    * Emits a {CancelListing} event.
    */
    function cancelListing(uint256 _tokenId) external {
        Listing storage listing = _listings[_tokenId];
        IERC721 nft = IERC721(listing.tokenAddress);
        require(listing.owner == msg.sender, 
            "MARKETPLACE: You are not an owner"
        );

        nft.safeTransferFrom(address(this), msg.sender, _tokenId);

        emit CancelListing(msg.sender, _tokenId);    

        delete _listings[_tokenId];
    }

}